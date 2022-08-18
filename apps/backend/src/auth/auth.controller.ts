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

import type { IRequestWithUser } from './interfaces';
import type LoginDto from './dto/login.dto';

type RequestWithSession = IRequestWithUser & {
	session: {
		authProvider: string;
		user: string;
	};
};

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

		this.logger.debug(request.session);

		return request.user;
	}

	@Get('logout')
	async logout(@Request() request: RequestWithSession) {
		return await new Promise((resolve, reject) =>
			request.session.destroy((err) => {
				if (err) reject(err);
				return resolve('Session ended');
			}),
		);
	}
}
