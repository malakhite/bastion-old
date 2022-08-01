import {
	Body,
	Controller,
	Get,
	Logger,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request as ExpressRequest } from 'express';
import { LoginDto } from './dtos/login.dto';

type RequestWithSession = ExpressRequest & {
	session: {
		authProvider: string;
		user: string;
	};
};

@Controller({ version: '1' })
export class AuthController {
	private readonly logger = new Logger(AuthController.name);

	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login(@Request() req: RequestWithSession, @Body() loginDto: LoginDto) {
		req.session.user = loginDto.email;
		req.session.authProvider = 'local';
		return req.user;
	}

	@Get('auth/logout')
	async logout(@Request() request: RequestWithSession) {
		return await new Promise((resolve, reject) =>
			request.session.destroy((err) => {
				if (err) reject(err);
				return resolve('Session ended');
			}),
		);
	}
}
