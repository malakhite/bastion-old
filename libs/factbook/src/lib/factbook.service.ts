import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';

import { nullify } from '@bastion/util';

import { FactbookCountry } from './entities/country.entity';
import {
	FactbookCategory,
	FactbookField,
	FactbookFieldType,
} from './entities/field.entity';
import { FactbookRegion } from './entities/region.entity';
import type {
	CountryDataCategory,
	CountryDataField,
	FactbookCountryCodeData,
	FactbookCountryCodeDataJson,
	FactbookCountryCodeValues,
	FactbookCountryData,
	FactbookCountryDataValues,
	FactbookCountryListData,
	FactbookPageData,
} from './interfaces/page-data';

type FactbookCountryListEntry =
	FactbookCountryListData['countries']['edges'][number];
type UpsertCountryArgs = {
	countryListEntry: FactbookCountryListEntry;
	countryCodes?: FactbookCountryCodeValues;
	countryData: FactbookCountryDataValues;
};

@Injectable()
export class FactbookService {
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

	private async fetchCountryList(): Promise<FactbookCountryListEntry[]> {
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

	async findOrCreateCategory(
		title: string,
		comparative?: CountryDataCategory['comparative'],
	): Promise<FactbookCategory> {
		let category = await this.categoryRepository.findOne({ title });
		if (!category) {
			category = new FactbookCategory();
			category.title = title;
			category.comparative = comparative
				? nullify(Number.parseInt(comparative, 10))
				: null;
			category = await this.categoryRepository.save(category);
		}
		return category;
	}

	async findOrCreateRegion(name: string): Promise<FactbookRegion> {
		let region = await this.regionRepository.findOne({ name });
		if (!region) {
			region = new FactbookRegion();
			region.name = name;
			region = await this.regionRepository.save(region);
		}
		return region;
	}

	async findOrCreateFieldType(
		dataField: CountryDataField,
	): Promise<FactbookFieldType> {
		let fieldType = await this.fieldTypeRepository.findOne({
			slug: dataField.id,
		});
		if (!fieldType) {
			fieldType = new FactbookFieldType();
			fieldType.cia_id = Number.parseInt(dataField.field_id, 10);
			fieldType.title = dataField.title;
			fieldType.slug = dataField.id;
			fieldType.definition = dataField.definition;
			fieldType = await this.fieldTypeRepository.save(fieldType);
		}
		return fieldType;
	}

	async upsertFields(
		country: FactbookCountry,
		dataCategory: CountryDataCategory,
	) {
		const fields = await this.fieldRepository.find({
			where: { country },
			relations: ['field_type', 'country', 'category'],
		});
		for (const fieldEntry of dataCategory.fields) {
			let fieldIndex = fields.findIndex(
				(dbField) => dbField.field_type.slug === fieldEntry.id,
			);
			if (fieldIndex === -1) {
				fieldIndex = fields.length;
				fields.push(new FactbookField());
				fields[fieldIndex].field_type =
					await this.findOrCreateFieldType(fieldEntry);
				fields[fieldIndex].category = await this.findOrCreateCategory(
					dataCategory.title,
					dataCategory.comparative,
				);
				fields[fieldIndex].country = country;
			}
			fields[fieldIndex].content = fieldEntry.content;
			fields[fieldIndex].comparative = fieldEntry.comparative
				? nullify(Number.parseInt(fieldEntry.comparative))
				: null;
		}
		return await this.fieldRepository.save(fields);
	}

	public async upsertCountry({
		countryListEntry,
		countryCodes,
		countryData,
	}: UpsertCountryArgs): Promise<FactbookCountry> {
		const publishedDate = new Date(
			Number.parseInt(countryData.published, 10) * 1000,
		);
		let country = await this.countryRepository.findOne({
			gec: countryData.code,
		});

		// If there's no update, just return.
		if (country && country.published_at >= publishedDate) {
			this.logger.log(
				`No changes for country ${country.name}. Continuing to next country.`,
			);
			return country;
		}

		// If we don't have an entry, create a new empty instance.
		if (!country) {
			country = new FactbookCountry();
		}

		country.name = countryListEntry.node.title;
		country.slug = countryListEntry.node.path
			.split('/')
			.filter((segment) => segment !== '')
			.slice(-1)[0];
		country.gec = countryData.code;
		if (countryCodes) {
			country.iso_3166_alpha_2 = nullify(countryCodes.iso_code_1);
			country.iso_3166_alpha_3 = nullify(countryCodes.iso_code_2);
			country.iso_3166_numeric = nullify(
				Number.parseInt(countryCodes.iso_code_3, 10),
			);
			country.stanag_1059 = nullify(countryCodes.stanag_code);
			country.internet_code = nullify(countryCodes.internet_code);
			country.code_comment = nullify(countryCodes.comment);
		}
		country.flag_description = nullify(countryData.flag_description);
		country.published_at = publishedDate;
		country.region = await this.findOrCreateRegion(countryData.region);

		country = await this.countryRepository.save(country);
		return country;
	}

	public async processCountries() {
		const countries = await this.fetchCountryList();
		const { country_codes } = await this.fetchCountryCodes();
		for (const countryListEntry of countries) {
			const countryData = await this.fetchCountry(countryListEntry);
			if (!countryData) {
				this.logger.error(
					`No country data found for country ${countryListEntry.node.title}`,
				);
				continue;
			}
			const countryCodes = country_codes.find(
				(country_code) => country_code.gec === countryData.code,
			);
			const country = await this.upsertCountry({
				countryListEntry,
				countryCodes,
				countryData,
			});

			if (
				country.published_at >=
				new Date(Number.parseInt(countryData.published, 10) * 1000)
			)
				continue;

			if (!Array.isArray(country.fields)) {
				country.fields = [];
			}

			for (const categoryFields of countryData.categories) {
				const fields = await this.upsertFields(country, categoryFields);
				country.fields = [...country.fields, ...fields];
			}
		}
	}
}
