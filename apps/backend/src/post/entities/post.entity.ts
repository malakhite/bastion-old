/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Exclude } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { PostRevision } from './post-revision.entity';

@Entity({
	name: 'posts',
	orderBy: {
		published_at: 'DESC',
	},
})
export class Post {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({
		type: 'text',
		transformer: {
			to: (value: string) =>
				value.toLowerCase().trim().replace(/\s+/g, '-'),
			from: (value) => value,
		},
	})
	@Index({ unique: true })
	slug!: string;

	@Column({ type: 'boolean' })
	is_published: boolean = false;

	@IsDate()
	@Column({ type: 'timestamptz', nullable: true })
	published_at: Date | null = null;

	@OneToOne(() => PostRevision, { eager: true })
	@JoinColumn({ name: 'current_revision_id' })
	current_revision!: PostRevision;

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
