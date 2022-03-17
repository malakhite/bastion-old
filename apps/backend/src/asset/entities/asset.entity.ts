import { Exclude } from 'class-transformer';
import { IsDate, IsUrl, IsUUID } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('assets')
export class Asset {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('varchar')
	key!: string;

	@IsUrl()
	@Column('varchar')
	url!: string;

	@Column({ type: 'varchar', nullable: true })
	alt_text: string | null = null;

	@Column({ type: 'integer', nullable: true })
	height: number | null = null;

	@Column({ type: 'integer', nullable: true })
	width: number | null = null;

	@ManyToOne(() => User, { eager: true })
	@JoinColumn({ name: 'author_id' })
	author!: User;

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
