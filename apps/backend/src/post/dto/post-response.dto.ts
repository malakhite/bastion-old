import { Image } from '../../images/entities/image.entity';
import { User } from '../../user/entities/user.entity';

export class PostResponseDto {
	id!: number;
	slug!: string;
	title!: string;
	author!: Omit<User, 'password'>;
	hero!: Image | null;
	text_json!: string | null;
	text!: string;
	created_at!: Date;
	published_at!: Date | null;
	updated_at!: Date | null;
}
