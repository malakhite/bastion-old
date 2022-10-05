import * as argon2 from 'argon2';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

import type { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(private readonly userService: UserService) {}

	public async getAuthenticatedUser(
		email: string,
		pass: string,
	): Promise<User> {
		try {
			const user = await this.userService.findOneByEmail(email);
			if (user) {
				const isPasswordMatching = await argon2.verify(
					user.password,
					pass,
				);
				if (isPasswordMatching) {
					return user;
				}
			}
			throw new UnauthorizedException('Wrong credentials provided.');
		} catch (e) {
			throw new UnauthorizedException('Wrong credentials provided.');
		}
	}
}
