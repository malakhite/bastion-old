import {
	ClassSerializerInterceptor,
	Controller,
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
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() request: IRequestWithUser) {
		const { user } = request;
		return this.authService.login(user);
	}
}
