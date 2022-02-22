import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { Country } from './country.entity';

@Entity()
class Shared extends Base {
	@Column({ type: 'varchar' })
	title!: string;

	@Column()
	comparative!: boolean;
}

@Entity()
export class Field extends Shared {
	@Column({ type: 'numeric' })
	field_id!: number;

	@Column({ type: 'text' })
	definition!: string;

	@Column({ type: 'varchar' })
	id_slug!: string;

	@Column({ type: 'text' })
	content!: string;

	@ManyToOne(() => Country, (country) => country.fields)
	@JoinColumn({ name: 'country_id' })
	country!: Country;

	@ManyToOne(() => Category)
	@JoinColumn({ name: 'category_id' })
	category!: Category;
}

@Entity()
export class Category extends Shared {
	@OneToMany(() => Field, (field) => field.category)
	fields!: Field[];
}
