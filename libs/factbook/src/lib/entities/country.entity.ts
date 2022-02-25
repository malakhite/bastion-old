import { Exclude } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { FactbookField } from './field.entity';
import { FactbookRegion } from './region.entity';

@Entity({
	name: 'factbook_countries',
	orderBy: {
		slug: 'ASC',
	},
})
export class FactbookCountry {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@IsDate()
	@CreateDateColumn({ type: 'timestamptz' })
	created_at!: Date;

	@IsDate()
	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date | null = null;

	@Exclude()
	@IsDate()
	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at: Date | null = null;

	@Column({ type: 'text' })
	name!: string;

	@Column({ type: 'text' })
	@Index({ unique: true })
	slug!: string;

	@Column({ type: 'text' })
	@Index({ unique: true })
	gec!: string;

	@Column({ type: 'text', nullable: true })
	iso_3166_alpha_2!: string | null;

	@Column({ type: 'text', nullable: true })
	iso_3166_alpha_3!: string | null;

	@Column({ type: 'numeric', nullable: true })
	iso_3166_numeric!: number | null;

	@Column({ type: 'text', nullable: true })
	stanag_1059!: string | null;

	@Column({
		transformer: {
			to: (value: string) => value?.toLowerCase().trim(),
			from: (value) => value,
		},
		type: 'text',
		nullable: true,
	})
	internet_code!: string | null;

	@Column({ type: 'text', nullable: true })
	code_comment!: string | null;

	@ManyToOne(() => FactbookRegion, { eager: true })
	@JoinColumn({ name: 'region_id' })
	region!: FactbookRegion;

	@Column({ type: 'timestamptz' })
	published_at!: Date;

	@Column({ type: 'text', nullable: true })
	flag_description!: string | null;

	@OneToMany(() => FactbookField, (field) => field.country)
	fields!: FactbookField[];
}
