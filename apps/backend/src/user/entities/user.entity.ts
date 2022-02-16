/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsEmail } from 'class-validator';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	Unique,
} from 'typeorm';
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

	@BeforeInsert()
	async hashPassword(password = this.password) {
		if (password) {
			this.password = await argon2.hash(password);
		}
	}

	@BeforeUpdate()
	async checkPassword(password = this.password) {
		if (password && !password.startsWith('$argon2')) {
			this.password = await argon2.hash(password);
		}
	}

	constructor(partial: Partial<User>) {
		super();
		Object.assign(this, partial);
	}
}
