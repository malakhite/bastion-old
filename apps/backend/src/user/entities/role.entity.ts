import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';
import { Base } from '../../common/entities/base.entity';

@Entity({ name: 'roles' })
export class Role extends Base {
	@Transform(({ value }) => (value as string).toLowerCase().trim())
	@Column({ type: 'varchar', update: false })
	@Index({ unique: true })
	name!: string;

	@Exclude()
	@Column('varchar')
	description!: string;

	constructor(role: Role) {
		super();
		Object.assign(this, role);
	}
}
