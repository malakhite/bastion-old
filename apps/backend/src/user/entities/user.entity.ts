import { Exclude } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsUUID } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../auth/entities/role.entity';

/* eslint-disable @typescript-eslint/no-inferrable-types */
@Entity({
	orderBy: {
		created_at: 'ASC',
		email: 'ASC',
	},
})
@Unique(['email'])
export class User {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

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

	@IsDate()
	@CreateDateColumn({ type: 'timestamptz' })
	created_at!: Date;

	@IsDate()
	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date | null = null;

	@Exclude()
	@IsDate()
	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at: Date | null = null;

	constructor(partial: Partial<User>) {
		Object.assign(this, partial);
	}
}
