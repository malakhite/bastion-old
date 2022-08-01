import * as argon2 from 'argon2';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(private usersService: UsersService) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findUserByEmail(email);
		this.logger.debug(user);
		if (user && user.password) {
			const valid = await argon2.verify(user.password, password);
			this.logger.debug({ valid });
			if (valid) {
				return user;
			}
		}
		return null;
	}
}
