type FileType = 'summary' | 'travel' | 'audio' | 'document' | 'image';

class File {
	type!: FileType;
	caption!: string;
	category!: string;
	thumb!: string;
	full!: string;
}

class Field {
	title!: string;
	comparative!: boolean;
	field_id!: string;
	definition!: string;
	id!: string;
	content!: string;
}

class Category {
	title!: string;
	fields!: Field[];
	comparative!: boolean;
}

export class CountryDataJson {
	name!: string;
	code!: string;
	region!: string;
	published!: string;
	flag_description!: string;
	travel!: File;
	media!: File[];
	categories!: Category[];
}

export class CiaPageDataDto {
	componentChuckName!: string;
	path!: string;
	result!: {
		data: {
			country: {
				json: string; // Has to be JSON.parsed to yield `CountryDataJson`
				title: string;
				code: string;
				path: string;
				region: string;
				launchpad_modified: string;
			};
		};
	};
	staticQueryHashes!: string[];
}
