import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosInstance } from 'axios';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { Category, Field } from './entities/field.entity';
import { Region } from './entities/region.entity';
import { FactbookSources, FactbookUpdate } from './entities/update.entity';
import {
	CountryCodeData,
	CountryCodeDataJson,
	CountryData,
	CountryDataValues,
	CountryListData,
	PageData,
} from './interfaces/page-data';

@Injectable()
export class CountryDataService implements OnModuleInit {
	countries: CountryListData['countries']['edges'] = [];
	fetcher: AxiosInstance;
	updates: {
		[source in FactbookSources]?: FactbookUpdate;
	} = {};

	constructor(
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,

		@InjectRepository(Country)
		private countryRepository: Repository<Country>,

		@InjectRepository(FactbookUpdate)
		private updateRepository: Repository<FactbookUpdate>,

		@InjectRepository(Field)
		private fieldRepository: Repository<Field>,

		@InjectRepository(Region)
		private regionRepository: Repository<Region>,
	) {
		this.fetcher = axios.create({
			baseURL: 'https://www.cia.gov/the-world-factbook/page-data',
			headers: {
				accept: 'application/json',
			},
		});
	}

	async onModuleInit() {
		await this.init();
		await this.upsertCountries();
	}

	async init(): Promise<void> {
		await this.fetchCountryList();
		await this.fetchUpdateTimestamps();
	}

	async fetchUpdateTimestamps(): Promise<void> {
		const updates = await this.updateRepository.find();
		for (const update of updates) {
			this.updates[update.data_source] = update;
		}
	}

	async fetchCountryList(): Promise<void> {
		const { data: countryListResponse } = await this.fetcher.get<
			PageData<CountryListData>
		>('/countries/page-data.json');
		this.countries = countryListResponse.result.data.countries.edges;
	}

	getLastUpdate(source: FactbookSources): Date | undefined {
		const sourceEntry = this.updates[source];
		return sourceEntry?.updated;
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async upsertCountries() {
		if (this.countries.length === 0) {
			await this.init();
		}

		const { data: countryCodeResponse } = await this.fetcher.get<
			PageData<CountryCodeData>
		>('/references/country-data-codes/page-data.json');

		const parsedCodes: CountryCodeDataJson = JSON.parse(
			countryCodeResponse.result.data.page.json,
		);
		const { country_codes, updated } = parsedCodes;
		const remoteUpdated = new Date(updated);
		const localUpdated = this.getLastUpdate(FactbookSources.COUNTRY_CODES);
		if (localUpdated && localUpdated < remoteUpdated) {
			const update = new FactbookUpdate();
			update.data_source = FactbookSources.COUNTRY_CODES;
			update.updated = remoteUpdated;
			this.updateRepository.save(update);
			this.updates[update.data_source] = update;
		}

		for (const country of this.countries) {
			const url = country.node.path.replace('/the-world-fact-book', '');
			const { data: countryDataResponse } = await this.fetcher.get<
				PageData<CountryData>
			>(`${url}page-data.json`);

			const parsedData: CountryDataValues = JSON.parse(
				countryDataResponse.result.data.country.json,
			);

			const newCountry =
				(await this.countryRepository.findOne({
					fips: parsedData.code,
				})) || new Country();

			const published_at = new Date(parsedData.published);
			if (
				newCountry.published_at &&
				published_at > newCountry.published_at
			) {
				break;
			}

			const countryCode = country_codes.find(
				(code) => code.gec === parsedData.code,
			);
			if (!countryCode) {
				throw new Error(
					`Country codes not loaded for ${country.node.title}`,
				);
			}

			newCountry.addCountryCodeData(countryCode);

			const region =
				(await this.regionRepository.findOne({
					name: parsedData.region,
				})) || new Region();
			region.name = region.name || parsedData.region;
			newCountry.region = region;

			newCountry.published_at = published_at;
			newCountry.flag_description = parsedData.flag_description;

			this.countryRepository.save(newCountry);

			for (const category of parsedData.categories) {
				const newCategory =
					(await this.categoryRepository.findOne({
						title: category.title,
					})) || new Category();
				newCategory.comparative =
					category.comparative || newCategory.comparative;
				newCategory.title = category.title || newCategory.title;
				this.categoryRepository.save(newCategory);

				for (const field of category.fields) {
					const newField =
						(await this.fieldRepository.findOne({
							country: newCountry,
							category: newCategory,
							field_id: Number.parseInt(field.field_id, 10),
						})) || new Field();
					newField.field_id = Number.parseInt(field.field_id, 10);
					newField.definition =
						field.definition || newField.definition;
					newField.id_slug = field.id || newField.id_slug;
					newField.content = field.content || newField.content;
					newField.country = newCountry;
					newField.category = newCategory;
					this.fieldRepository.save(newField);
				}
			}
		}
	}
}
