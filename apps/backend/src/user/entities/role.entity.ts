import { Exclude, Transform } from 'class-transformer';
import { IsDate } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Transform(({ value }) => (value as string).toLowerCase().trim())
	@Column({ type: 'text', update: false })
	@Index({ unique: true })
	name!: string;

	@Exclude()
	@Column({ type: 'text' })
	description!: string;

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

	constructor(role: Role) {
		Object.assign(this, role);
	}
}
