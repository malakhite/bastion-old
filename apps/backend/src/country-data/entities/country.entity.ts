import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { Field } from './field.entity';
import { Region } from './region.entity';

@Entity({
	name: 'countries',
	orderBy: {
		name: 'ASC',
	},
})
export class Country extends Base {
	@Column({ type: 'varchar' })
	name!: string;

	@Column({ type: 'varchar' })
	@Index({ unique: true })
	slug!: string;

	@Column({ type: 'varchar', length: 3 })
	@Index({ unique: true })
	fips!: string;

	@Column({ type: 'varchar', length: 2, nullable: true })
	iso_3166_alpha_2!: string | null;

	@Column({ type: 'varchar', length: 3, nullable: true })
	iso_3166_alpha_3!: string | null;

	@Column({ type: 'numeric', nullable: true })
	iso_3166_numeric!: number | null;

	@Column({ type: 'varchar', length: 3, nullable: true })
	stanag!: string | null;

	@Column({
		transformer: {
			to: (value: string) => value.toLowerCase().trim(),
			from: (value) => value,
		},
		type: 'varchar',
		length: '4',
		nullable: true,
	})
	internet_code!: string | null;

	@Column({ type: 'varchar', nullable: true })
	code_comment!: string | null;

	@ManyToOne(() => Region, { eager: true })
	@JoinColumn({ name: 'region_id' })
	region!: Region;

	@Column({ type: 'timestamptz' })
	published_at!: Date;

	@Column({ type: 'varchar', nullable: true })
	flag_description!: string | null;

	@OneToMany(() => Field, (field) => field.country)
	fields!: Field[];
}
