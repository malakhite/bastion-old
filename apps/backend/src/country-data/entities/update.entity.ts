import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum FactbookSources {
	COUNTRY_CODES = 'country_codes',
}

@Entity({
	name: 'factbook_updates',
})
export class FactbookUpdate {
	@PrimaryColumn('varchar')
	data_source!: FactbookSources;

	@Column('timestamptz')
	updated!: Date;
}
