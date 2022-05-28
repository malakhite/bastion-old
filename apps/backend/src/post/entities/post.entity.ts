import { IsDate } from 'class-validator';
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	JoinColumn,
	OneToMany,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { genNanoId } from '../../util';
import { PostRevision } from './post-revision.entity';

@Entity({
	name: 'posts',
	orderBy: {
		published_at: 'DESC',
	},
})
export class Post {
	@PrimaryColumn({ type: 'text' })
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

	@ManyToOne(() => User)
	@JoinColumn({ name: 'author_id' })
	author!: User;

	@OneToMany(() => PostRevision, (revision) => revision.post, { eager: true })
	revisions!: PostRevision[];

	@IsDate()
	@Column({ type: 'timestamptz', nullable: true })
	published_at: Date | null = null;

	@IsDate()
	@CreateDateColumn({ type: 'timestamptz' })
	created_at!: Date;

	@IsDate()
	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at: Date | null = null;

	@IsDate()
	@DeleteDateColumn({ type: 'timestamptz', nullable: true })
	deleted_at: Date | null = null;

	@BeforeInsert()
	async addNanoId() {
		this.id = await genNanoId();
	}
}
