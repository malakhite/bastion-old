import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsEnum } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export enum Role {
	OWNER = 'owner',
	ADMIN = 'admin',
	USER = 'user',
	GUEST = 'guest',
}

@Entity({
	name: 'users',
	orderBy: {
		created_at: 'ASC',
		email: 'ASC',
	},
})
export class User {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@IsEmail()
	@Column({
		type: 'text',
		transformer: {
			to: (value: string) => value.toLowerCase().trim(),
			from: (value) => value,
		},
		unique: true,
	})
	email!: string;

	@Column({ type: 'text' })
	name!: string;

	@Exclude()
	@Column({ type: 'text' })
	password!: string;

	@IsBoolean()
	@Column({ type: 'boolean' })
	is_active: boolean = false;

	@IsEnum(Role)
	@Column({
		type: 'enum',
		enum: Role,
		enumName: 'role',
		default: Role.GUEST,
	})
	role!: Role;

	@IsDate()
	@CreateDateColumn({ type: 'timestamptz' })
	created_at!: Date;

	@IsDate()
	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at?: Date | null;

	@IsDate()
	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at?: Date | null;
}
