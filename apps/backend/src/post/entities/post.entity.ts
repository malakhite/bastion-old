/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsDate, IsUUID } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Asset } from '../../asset/entities/asset.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
	orderBy: {
		published_at: 'DESC',
	},
})
export class Post {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'varchar',
		transformer: {
			to: (value: string) => value.toLowerCase().trim(),
			from: (value) => value,
		},
	})
	@Index({ unique: true })
	slug!: string;

	@Column('varchar')
	title!: string;

	@ManyToOne(() => User, { eager: true })
	@JoinColumn({ name: 'author_id' })
	author!: User;

	@ManyToOne(() => Asset, { eager: true, nullable: true })
	@JoinColumn({ name: 'hero_id' })
	hero: Asset | null = null;

	@Column({ type: 'text' })
	content!: string;

	@Column({ type: 'boolean' })
	is_published: boolean = false;

	@IsDate()
	@CreateDateColumn({ type: 'timestamptz' })
	created_at!: Date;

	@IsDate()
	@Column({ type: 'timestamptz', nullable: true })
	published_at: Date | null = null;

	@IsDate()
	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date | null = null;

	@IsDate()
	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at: Date | null = null;
}
