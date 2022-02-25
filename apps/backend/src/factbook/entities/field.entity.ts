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
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'text' })
	title!: string;

	@Column({ type: 'numeric', nullable: true })
	comparative?: number | null;
}

@Entity({ name: 'factbook_field_types' })
export class FactbookFieldType {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'numeric', nullable: true })
	@Index()
	cia_id!: number | null;

	@Column({ type: 'text' })
	title!: string;

	@Column({ type: 'text' })
	@Index({ unique: true })
	slug!: string;

	@Column({ type: 'text', nullable: true })
	definition?: string | null;
}

@Entity({ name: 'factbook_fields' })
export class FactbookField {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne(() => FactbookFieldType)
	@JoinColumn({ name: 'field_type_id' })
	fieldType!: FactbookFieldType;

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
