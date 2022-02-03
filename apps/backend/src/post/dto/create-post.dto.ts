export class CreatePostDto {
	slug!: string;
	title!: string;
	author_id!: string;
	hero_id?: string;
	content!: string;
	is_published?: boolean;
	published_at?: Date;
}
