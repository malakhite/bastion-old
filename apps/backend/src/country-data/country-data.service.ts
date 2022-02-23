import { slugify } from '@bastion/util';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { Category, Field } from './entities/field.entity';
import { Region } from './entities/region.entity';
import { FactbookUpdate } from './entities/update.entity';
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
	private readonly logger = new Logger(CountryDataService.name);

	constructor(
		private httpService: HttpService,

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
	) {}

	async onModuleInit() {
		await this.upsertCountries();
	}

	private async fetchCountryList(): Promise<
		CountryListData['countries']['edges']
	> {
		const countryListResponse = this.httpService.get<
			PageData<CountryListData>
		>('/countries/page-data.json');
		return await lastValueFrom(
			countryListResponse.pipe(
				map((response) => {
					const { data } = response;
					return data?.result?.data?.countries?.edges;
				}),
			),
		);
	}

	private async fetchCountryCodes(): Promise<CountryCodeDataJson> {
		const countryCodeResponse = this.httpService.get<
			PageData<CountryCodeData>
		>('/references/country-data-codes/page-data.json');

		return await lastValueFrom<CountryCodeDataJson>(
			countryCodeResponse.pipe(
				map((response) => {
					const { data } = response;
					return JSON.parse(data?.result?.data?.page?.json);
				}),
			),
		);
	}

	private async fetchCountry(
		country: CountryListData['countries']['edges'][number],
	): Promise<CountryDataValues> {
		const countryUrl = country.node.path.replace('/the-world-factbook', '');

		const countryDataResponse = this.httpService.get<PageData<CountryData>>(
			`${countryUrl}page-data.json`,
		);
		return await lastValueFrom<CountryDataValues>(
			countryDataResponse.pipe(
				map(({ data }) => JSON.parse(data.result.data.country.json)),
			),
		);
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async upsertCountries() {
		try {
			const countries = await this.fetchCountryList();
			const { country_codes } = await this.fetchCountryCodes();

			for (const country of countries) {
				const countryData = await this.fetchCountry(country);
				const published = new Date(
					Number.parseInt(countryData.published, 10) * 1000,
				);
				const existingCountry = await this.countryRepository.findOne({
					fips: countryData.code,
				});

				if (
					existingCountry &&
					existingCountry.published_at >= published
				) {
					continue;
				}

				const countryCodes = country_codes.find(
					(country_code) => country_code.gec === countryData.code,
				);
				if (!countryCodes) {
					throw new Error(
						`Country codes missing for country ${country.node.title}`,
					);
				}
				let newCountry = new Country();
				newCountry.name = country.node.title;
				newCountry.slug = slugify(country.node.title);
				newCountry.fips = countryCodes.gec;
				newCountry.iso_3166_alpha_2 = countryCodes.iso_code_1;
				newCountry.iso_3166_alpha_3 = countryCodes.iso_code_2;
				newCountry.iso_3166_numeric = Number.parseInt(
					countryCodes.iso_code_3,
					10,
				);
				newCountry.stanag = countryCodes.stanag_code;
				newCountry.internet_code = countryCodes.internet_code;
				newCountry.code_comment = countryCodes.comment;
				newCountry.flag_description = countryData.flag_description;
				newCountry.published_at = published;

				const existingRegion = await this.regionRepository.findOne({
					name: countryData.region,
				});
				const region = existingRegion || new Region();
				if (!existingRegion) {
					region.name = countryData.region;
					await this.regionRepository.save(region);
				}
				newCountry.region = region;

				if (existingCountry) {
					newCountry = this.countryRepository.merge(
						existingCountry,
						newCountry,
					);
				}

				await this.countryRepository.save(newCountry);

				for (const category of countryData.categories) {
					const existingCategory =
						await this.categoryRepository.findOne({
							title: category.title,
						});
					const workingCategory = existingCategory || new Category();

					if (!existingCategory) {
						workingCategory.title = category.title;
						workingCategory.comparative =
							category.comparative === 'true'
								? true
								: category.comparative === 'false'
								? false
								: undefined;
						await this.categoryRepository.save(workingCategory);
					}

					for (const field of category.fields) {
						const fieldId = Number.parseInt(field.field_id, 10);
						const existingField =
							await this.fieldRepository.findOne({
								field_id: fieldId,
								country: newCountry,
							});
						const workingField = existingField || new Field();
						workingField.title = field.title;
						workingField.comparative =
							field.comparative === 'true'
								? true
								: field.comparative === 'false'
								? false
								: undefined;
						workingField.field_id = fieldId;
						workingField.definition = field.definition;
						workingField.id_slug = field.id;
						workingField.content = field.content;
						workingField.country = newCountry;
						workingField.category = workingCategory;

						await this.fieldRepository.save(workingField);
					}
				}
			}
		} catch (e) {
			this.logger.error(e);
		}
	}
}
