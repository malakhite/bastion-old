import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { Category } from './field.entity';
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

	@Column({ type: 'varchar', length: 2 })
	iso_3166_alpha_2!: string;

	@Column({ type: 'varchar', length: 3 })
	iso_3166_alpha_3!: string;

	@Column({ type: 'numeric', length: 3 })
	iso_3166_numeric!: number;

	@Column({
		type: 'varchar',
		length: 3,
	})
	stanag_code!: string;

	@Column({
		transformer: {
			to: (value: string) => value.toLowerCase().trim(),
			from: (value) => value,
		},
		type: 'varchar',
		length: '4',
	})
	internet_code!: string;

	@Column({ type: 'varchar' })
	code_comment!: string;

	@ManyToOne(() => Region, { eager: true })
	@JoinColumn({ name: 'region_id' })
	region!: Region;

	@Column({ type: 'timestamptz' })
	published_at!: Date;

	@Column({ type: 'varchar' })
	flag_description!: string;
}
