import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<User | undefined> {
		const user = await this.userService.findOneByEmail(email);
		if (user && (await argon2.verify(user.password, pass))) {
			return user;
		}
	}

	async login(user: User) {
		const payload = {
			email: user.email,
			sub: user.id,
			role: user.role.name,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
