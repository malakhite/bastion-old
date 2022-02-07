import { Exclude } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';
import {
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({
	orderBy: {
		created_at: 'ASC',
	},
})
export class Base {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

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
}
