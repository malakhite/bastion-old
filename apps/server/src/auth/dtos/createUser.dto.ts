export class CreateUserDto {
	email: string;
	name: string;
	password: string;
	image?: string;
	is_active?: boolean;
	is_admin?: boolean;
}
