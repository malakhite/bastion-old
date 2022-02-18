export class CiaCountryCodeDto {
	entity!: string; // English name
	gec!: string; // FIPS code
	iso_code_1!: string; // ISO 3166 alpha-2 code
	iso_code_2!: string; // ISO 3166 alpha-3 code
	iso_code_3!: string; // ISO 3166 numeric code
	stanag_code!: string; // NATO code
	internet_code!: string; // Country TLD
	comment!: string; // Miscellaneous information
}
