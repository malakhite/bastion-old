export class CreatePostDto {
	slug!: string;
	title!: string;
	author_id!: number;
	hero_id?: string;
	text_json?: string;
	text!: string;
	published_at?: Date;
}
