import * as argon2 from 'argon2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

import type { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	public async validateUser(email: string, pass: string): Promise<User> {
		const user = await this.userService.findOneByEmail(email);
		if (user && (await argon2.verify(user.password, pass))) {
			return user;
		}
		throw new UnauthorizedException('Wrong credentials provided.');
	}
}
