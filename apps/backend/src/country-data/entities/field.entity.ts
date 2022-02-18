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
	id!: string;

	@Column({ type: 'text' })
	content!: string;

	@ManyToOne(() => Category)
	@JoinColumn({ name: 'category_id' })
	category!: Category;
}

@Entity()
export class Category extends Shared {
	@ManyToOne(() => Country)
	@JoinColumn({ name: 'country_id' })
	country!: Country;
}
