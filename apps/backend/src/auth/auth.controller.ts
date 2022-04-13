import {
	ClassSerializerInterceptor,
	Controller,
	Post,
	Request,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'auth', version: '1' })
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req: ExpressRequest & { user: User }) {
		return this.authService.login(req.user);
	}
}
