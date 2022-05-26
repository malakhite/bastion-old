import * as argon2 from 'argon2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

import type { User } from '../user/entities/user.entity';
import type { ITokenPayload } from './interfaces';

@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	public async validateUser(email: string, pass: string): Promise<User> {
		const user = await this.userService.findOneByEmail(email);
		if (user && (await argon2.verify(user.password, pass))) {
			return user;
		}
		throw new UnauthorizedException('Wrong credentials provided.');
	}

	public async login(user: User) {
		const payload: ITokenPayload = { sub: user.id };
		const access_token = this.jwtService.sign(payload);
		return { access_token };
	}

	public getCookieWithJwtToken(sub: string) {
		const payload: ITokenPayload = { sub };
		const token = this.jwtService.sign(payload);
		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
			'ACCESS_TOKEN_SECRET',
		)}`;
	}
}
