import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'post_categories' })
export class PostCategory {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'text' })
	name!: string;

	@Column({ type: 'text', nullable: true })
	description!: string | null;
}
