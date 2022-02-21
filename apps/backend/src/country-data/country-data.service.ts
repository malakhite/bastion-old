import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosInstance } from 'axios';
import { Repository } from 'typeorm';
import {
	CiaCountryCodeDto,
	CiaCountryCodeJson,
} from './dto/cia-country-code.dto';
import { CiaPageDataDto, CountryDataJson } from './dto/cia-country-facts.dto';
import { Country } from './entities/country.entity';
import { Field } from './entities/field.entity';
import { Region } from './entities/region.entity';

type CountryData = {
	countryCodeData: CiaCountryCodeJson;
	countryData: CountryDataJson;
};

@Injectable()
export class CountryDataService {
	fetcher: AxiosInstance;

	constructor(
		@InjectRepository(Country)
		private countryRepository: Repository<Country>,

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

	// async pageDataFetcher() {
	// 	const baseURL = 'https://www.cia.gov/the-world-factbook/page-data/';
	// 	const fetcher = axios.create({
	// 		baseURL,
	// 		headers: {
	// 			accept: 'application/json',
	// 		},
	// 	});

	// 	const [countryCode, countryData] = await Promise.all([
	// 		fetcher.get<CiaCountryCodeDto>(
	// 			'/references/country-data-codes/page-data.json',
	// 		),
	// 		fetcher.get<CiaPageDataDto>(`/countries/${country}/page-data.json`),
	// 	]);

	// 	return fetcher;
	// }

	async upsertCountries() {
		const { data: countryCodeResponse } =
			await this.fetcher.get<CiaCountryCodeDto>(
				'/references/country-data-codes/page-data.json',
			);
		const parsedCodes: CiaCountryCodeJson = JSON.parse(
			countryCodeResponse.result.data.page.json,
		);
		const { country_codes } = parsedCodes;

		for (const country_code of country_codes) {
			// Change db schema to have country_codes and country data in separate tables
			// Having them in the same table complicates the schema
			// OR make request for country data before upserting each country code...
			const countryName = country_code.entity.split(/\s/).join('-');
			const { data: countryDataResponse } =
				await this.fetcher.get<CiaPageDataDto>(
					`/countries/${countryName}/page-data.json`,
				);
			const parsedData: CountryDataJson = JSON.parse(
				countryDataResponse.result.data.country.json,
			);
			// Only update country codes when timestamp is more recent
			// Only update country data when timestamp is more recent
		}
	}
}
