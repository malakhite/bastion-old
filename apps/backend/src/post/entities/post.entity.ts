/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IsDate } from 'class-validator';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Asset } from '../../asset/entities/asset.entity';
import { Base } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
	name: 'posts',
	orderBy: {
		published_at: 'DESC',
	},
})
export class Post extends Base {
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
	@Column({ type: 'timestamptz', nullable: true })
	published_at: Date | null = null;
}
