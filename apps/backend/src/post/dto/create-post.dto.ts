import {
	IsDateString,
	IsJSON,
	IsOptional,
	IsPositive,
	IsString,
	IsUUID,
} from 'class-validator';

export class CreatePostDto {
	@IsString()
	slug!: string;

	@IsString()
	title!: string;

	@IsPositive()
	author_id!: number;

	@IsUUID()
	@IsOptional()
	hero_id?: string;

	@IsOptional()
	@IsJSON()
	text_json?: string;

	@IsString()
	text!: string;

	@IsOptional()
	@IsDateString()
	published_at?: string;
}
