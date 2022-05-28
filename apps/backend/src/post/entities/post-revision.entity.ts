import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Asset } from '../../asset/entities/asset.entity';
import { User } from '../../user/entities/user.entity';
import { PostCategory } from './category.entity';
import { Post } from './post.entity';

@Entity({
	name: 'post_revisions',
	orderBy: {
		created_at: 'DESC',
	},
})
export class PostRevision {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'text' })
	title!: string;

	@ManyToOne(() => Post)
	@JoinColumn({ name: 'post_id' })
	post!: Post;

	@ManyToOne(() => User, { eager: true })
	author!: User;

	@ManyToOne(() => Asset, { eager: true, nullable: true })
	@JoinColumn({ name: 'hero_id' })
	hero: Asset | null = null;

	@Column({ type: 'jsonb', nullable: true })
	text_json: string | null = null;

	@Column({ type: 'text' })
	text!: string;

	@ManyToMany(() => PostCategory)
	@JoinTable()
	categories!: PostCategory[];

	@CreateDateColumn({ type: 'timestamptz' })
	created_at!: Date;
}
