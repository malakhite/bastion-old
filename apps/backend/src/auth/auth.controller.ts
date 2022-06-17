import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	Logger,
	Post,
	Request,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

import type { IRequestWithUser } from './interfaces';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ version: '1' })
export class AuthController {
	private readonly logger: Logger = new Logger(AuthController.name);

	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() request: IRequestWithUser) {
		const { user } = request;
		return user;
	}

	@Get('/logout')
	async logout(@Request() request: IRequestWithUser) {
		return await new Promise((resolve, reject) =>
			request.session.destroy((err) => {
				if (err) reject(err);
				return resolve('Session ended');
			}),
		);
	}
}
