import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDate, IsEmail, IsUrl } from 'class-validator';
import { Exclude } from 'class-transformer';
import { nanoid } from '../auth.utils';

@Entity({ name: 'users', orderBy: { created_at: 'ASC', email: 'ASC' } })
export class User {
	@PrimaryColumn({ type: 'text' })
	id: string;

	@IsEmail()
	@Column({ type: 'text', unique: true })
	email: string;

	@Exclude()
	@Column({ type: 'text' })
	password: string;

	@Column({ type: 'text' })
	name: string;

	@IsUrl()
	@Column({ nullable: true, type: 'text' })
	image: string;

	@IsBoolean()
	@Column({ default: false })
	is_active: boolean;

	@IsBoolean()
	@Column({ default: false })
	is_admin: boolean;

	@IsDate()
	@CreateDateColumn({ type: 'timestamptz' })
	created_at: Date;

	@IsDate()
	@UpdateDateColumn({ type: 'timestamptz' })
	updated_at: Date;

	@BeforeInsert()
	async addNanoid() {
		this.id = await nanoid();
	}
}
