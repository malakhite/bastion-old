/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Exclude } from 'class-transformer';
import { IsBoolean, IsEmail } from 'class-validator';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { Role } from './role.entity';

@Entity({
	name: 'users',
	orderBy: {
		created_at: 'ASC',
		email: 'ASC',
	},
})
@Unique(['email'])
export class User extends Base {
	@IsEmail()
	@Column({
		type: 'varchar',
		transformer: {
			to: (value: string) => value.toLowerCase().trim(),
			from: (value) => value,
		},
	})
	@Index({ unique: true })
	email!: string;

	@Column('varchar')
	name!: string;

	@Exclude()
	@Column('varchar')
	password!: string;

	@IsBoolean()
	@Column('boolean')
	is_active: boolean = true;

	@ManyToOne(() => Role, { eager: true })
	@JoinColumn({ name: 'role_id' })
	role!: Role;

	constructor(partial: Partial<User>) {
		super();
		Object.assign(this, partial);
	}
}
