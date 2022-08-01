import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'factbook_regions' })
export class FactbookRegion {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@Column({ type: 'varchar' })
	name!: string;
}
