import { Exclude, Transform } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Transform(({ value }) => (value as string).toLowerCase().trim())
	@Column({ type: 'varchar', update: false })
	@Index({ unique: true })
	name!: string;

	@Exclude()
	@Column('varchar')
	description!: string;

	constructor(role: Role) {
		Object.assign(this, role);
	}
}
