import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { FactbookCountry } from './entities/country.entity';
import {
	FactbookCategory,
	FactbookField,
	FactbookFieldType,
} from './entities/field.entity';
import { FactbookRegion } from './entities/region.entity';
import {
	FactbookCountryCodeData,
	FactbookCountryCodeDataJson,
	FactbookCountryData,
	FactbookCountryDataValues,
	FactbookCountryListData,
	FactbookPageData,
} from './interfaces/page-data';
import { nullify } from '@bastion/util';

@Injectable()
export class FactbookService implements OnModuleInit {
	private readonly logger = new Logger(FactbookService.name);

	constructor(
		private httpService: HttpService,

		@InjectRepository(FactbookCategory)
		private categoryRepository: Repository<FactbookCategory>,

		@InjectRepository(FactbookCountry)
		private countryRepository: Repository<FactbookCountry>,

		@InjectRepository(FactbookFieldType)
		private fieldTypeRepository: Repository<FactbookFieldType>,

		@InjectRepository(FactbookField)
		private fieldRepository: Repository<FactbookField>,

		@InjectRepository(FactbookRegion)
		private regionRepository: Repository<FactbookRegion>,
	) {}

	async onModuleInit() {
		await this.upsertCountries();
	}

	private async fetchCountryList(): Promise<
		FactbookCountryListData['countries']['edges']
	> {
		const countryListResponse = this.httpService.get<
			FactbookPageData<FactbookCountryListData>
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

	private async fetchCountryCodes(): Promise<FactbookCountryCodeDataJson> {
		const countryCodeResponse = this.httpService.get<
			FactbookPageData<FactbookCountryCodeData>
		>('/references/country-data-codes/page-data.json');

		return await lastValueFrom<FactbookCountryCodeDataJson>(
			countryCodeResponse.pipe(
				map((response) => {
					const { data } = response;
					return JSON.parse(data?.result?.data?.page?.json);
				}),
			),
		);
	}

	private async fetchCountry(
		country: FactbookCountryListData['countries']['edges'][number],
	): Promise<FactbookCountryDataValues | undefined> {
		try {
			const countryUrl = country.node.path.replace(
				'/the-world-factbook',
				'',
			);

			const countryDataResponse = this.httpService.get<
				FactbookPageData<FactbookCountryData>
			>(`${countryUrl}page-data.json`);
			return await lastValueFrom<FactbookCountryDataValues>(
				countryDataResponse.pipe(
					map(({ data }) =>
						JSON.parse(data.result.data.country.json),
					),
				),
			);
		} catch (e) {
			if (e instanceof Error) {
				if (
					'isAxiosError' in e &&
					(e as AxiosError).isAxiosError &&
					(e as AxiosError).response?.status === 404
				) {
					return undefined;
				}
			}
			throw e;
		}
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	private async upsertCountries() {
		try {
			const countries = await this.fetchCountryList();
			const { country_codes } = await this.fetchCountryCodes();

			for (const country of countries) {
				const countryData = await this.fetchCountry(country);
				if (!countryData) {
					continue;
				}
				const published = new Date(
					Number.parseInt(countryData.published, 10) * 1000,
				);
				let workingCountry = await this.countryRepository.findOne({
					gec: countryData.code,
				});

				if (
					workingCountry &&
					workingCountry.published_at >= published
				) {
					continue;
				}

				const countryCodes = country_codes.find(
					(country_code) => country_code.gec === countryData.code,
				);

				if (!workingCountry) {
					workingCountry = new FactbookCountry();
				}

				const [slug] = country.node.path
					.split('/')
					.filter((segment) => segment !== '')
					.slice(-1);
				workingCountry.name = country.node.title;
				workingCountry.slug = slug;
				workingCountry.gec = countryData.code;
				if (countryCodes) {
					workingCountry.iso_3166_alpha_2 = nullify(
						countryCodes.iso_code_1,
					);
					workingCountry.iso_3166_alpha_3 = nullify(
						countryCodes.iso_code_2,
					);
					workingCountry.iso_3166_numeric = nullify(
						Number.parseInt(countryCodes.iso_code_3, 10),
					);
					workingCountry.stanag_1059 = nullify(
						countryCodes.stanag_code,
					);
					workingCountry.internet_code = nullify(
						countryCodes.internet_code,
					);
					workingCountry.code_comment = nullify(countryCodes.comment);
				}
				workingCountry.flag_description = nullify(
					countryData.flag_description,
				);
				workingCountry.published_at = published;

				let workingRegion = await this.regionRepository.findOne({
					name: countryData.region,
				});

				if (!workingRegion) {
					workingRegion = new FactbookRegion();
					workingRegion.name = countryData.region;
					workingRegion = await this.regionRepository.save(
						workingRegion,
					);
				}

				workingCountry.region = workingRegion;

				workingCountry = await this.countryRepository.save(
					workingCountry,
				);

				for (const category of countryData.categories) {
					let workingCategory = await this.categoryRepository.findOne(
						{
							title: category.title,
						},
					);

					if (!workingCategory) {
						workingCategory = new FactbookCategory();
						workingCategory.title = category.title;
						workingCategory.comparative = category.comparative
							? nullify(Number.parseInt(category.comparative, 10))
							: null;
						workingCategory = await this.categoryRepository.save(
							workingCategory,
						);
					}

					for (const field of category.fields) {
						const fieldId = Number.parseInt(field.field_id, 10);
						let fieldType = await this.fieldTypeRepository.findOne({
							id: fieldId,
						});
						if (!fieldType) {
							fieldType = new FactbookFieldType();
							fieldType.id = fieldId;
							fieldType.title = field.title;
							fieldType.slug = field.id;
							fieldType.definition = field.definition;

							fieldType = await this.fieldTypeRepository.save(
								fieldType,
							);
						}
						let workingField = await this.fieldRepository.findOne({
							country: workingCountry,
							fieldType,
						});
						if (!workingField) {
							workingField = new FactbookField();
						}
						workingField.content = field.content;
						workingField.country = workingCountry;
						workingField.category = workingCategory;
						workingField.fieldType = fieldType;
						workingField.comparative = field.comparative
							? nullify(Number.parseInt(field.comparative, 10))
							: null;

						workingField = await this.fieldRepository.save(
							workingField,
						);
					}
				}
			}
		} catch (e) {
			this.logger.error(e);
		}
	}
}
