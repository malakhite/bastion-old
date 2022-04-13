import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JWTData } from './dto/jwt-data.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<User> {
		const user = await this.userService.findOneByEmail(email);
		if (user && (await argon2.verify(user.password, pass))) {
			return user;
		}
		throw new UnauthorizedException('Wrong credentials provided.');
	}

	async login(user: User) {
		const payload: JWTData = { sub: user.id };
		const access_token = this.jwtService.sign(payload);
		return { access_token };
	}
}
