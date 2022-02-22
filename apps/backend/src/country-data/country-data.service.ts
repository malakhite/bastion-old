import { Injectable } from '@nestjs/common';
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
export class CountryDataService {
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
			baseURL: 'https://www.cia.gov/the-world-factbook/page-data/',
			headers: {
				accept: 'application/json',
			},
		});
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
		const codeUpdateDate = new Date(updated);
		const codeLastUpdate = this.getLastUpdate(
			FactbookSources.COUNTRY_CODES,
		);
		if (codeLastUpdate && codeLastUpdate < codeUpdateDate) {
			const update = new FactbookUpdate();
			update.data_source = FactbookSources.COUNTRY_CODES;
			update.updated = codeUpdateDate;
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
			const published_at = new Date(parsedData.published);
			const [existingCountry] = await this.countryRepository.find({
				fips: parsedData.code,
			});
			if (existingCountry.published_at >= published_at) {
				break;
			}

			const newCountryEntity = new Country();
			const countryCode = country_codes.find(
				(code) => code.gec === parsedData.code,
			);
			if (!countryCode) {
				throw new Error(
					`Country codes not loaded for ${country.node.title}`,
				);
			}
			newCountryEntity.addCountryCodeData(countryCode);

			for (const category of parsedData.categories) {
				let categoryToUse: Category;
				const [existingCategory] = await this.categoryRepository.find({
					title: category.title,
				});
				if (existingCategory) {
					categoryToUse = existingCategory;
				} else {
					categoryToUse = new Category();
					categoryToUse.comparative = category.comparative;
					categoryToUse.title = category.title;
				}

				for (const field of category.fields) {
				}
			}
		}
	}
}
