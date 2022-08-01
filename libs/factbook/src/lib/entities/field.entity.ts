import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { FactbookCountry } from './country.entity';

@Entity({ name: 'factbook_categories' })
export class FactbookCategory {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@Column({ type: 'text' })
	title!: string;

	@Column({ type: 'numeric', nullable: true })
	comparative?: number | null;
}

@Entity({ name: 'factbook_field_types' })
export class FactbookFieldType {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	// Originally used this as the primary key, but the source data occasionally
	// omits this value
	@Column({ type: 'numeric', nullable: true })
	@Index()
	cia_id!: number | null;

	@Column({ type: 'text' })
	title!: string;

	// So far this appears to be a universal, unique identifier, however we are
	// still generating a key to back it up.
	@Column({ type: 'text' })
	@Index({ unique: true })
	slug!: string;

	@Column({ type: 'text', nullable: true })
	definition?: string | null;
}

@Entity({ name: 'factbook_fields' })
export class FactbookField {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@ManyToOne(() => FactbookFieldType)
	@JoinColumn({ name: 'field_type_id' })
	field_type!: FactbookFieldType;

	@ManyToOne(() => FactbookCountry, (country) => country.fields)
	@JoinColumn({ name: 'country_id' })
	country!: FactbookCountry;

	@ManyToOne(() => FactbookCategory)
	@JoinColumn({ name: 'category_id' })
	category?: FactbookCategory;

	@Column({ type: 'text' })
	content!: string;

	@Column({ type: 'numeric', nullable: true })
	comparative?: number | null;
}
