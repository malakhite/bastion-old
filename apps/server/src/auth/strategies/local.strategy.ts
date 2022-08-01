import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	private readonly logger = new Logger(LocalStrategy.name);

	constructor(private authService: AuthService) {
		super({
			usernameField: 'email',
			passwordField: 'password',
		});
	}

	async validate(email: string, password: string) {
		const user = await this.authService.validateUser(email, password);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
