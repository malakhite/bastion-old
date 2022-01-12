import { IsEmail, IsNotEmpty } from 'class-validator';

export default class LoginDTO {
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	password!: string;
}
