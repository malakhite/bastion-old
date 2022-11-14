import {
	Body,
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

import type LoginDto from './dto/login.dto';
import type { RequestWithSession } from './auth.types';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'auth', version: '1' })
export class AuthController {
	private readonly logger: Logger = new Logger(AuthController.name);

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(
		@Request() request: RequestWithSession,
		@Body() loginDto: LoginDto,
	) {
		request.session.user = loginDto.email;
		request.session.authProvider = 'local';

		return request.user;
	}

	@Get('logout')
	async logout(@Request() request: RequestWithSession) {
		this.logger.debug(request.session);
		return await new Promise((resolve, reject) =>
			request.session.destroy((err) => {
				if (err) reject(err);
				return resolve('Session ended');
			}),
		);
	}
}
