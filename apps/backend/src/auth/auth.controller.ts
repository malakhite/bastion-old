import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Post,
	Request,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'api/auth', version: '1' })
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService,
	) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req: ExpressRequest & { user: User }) {
		return this.authService.login(req.user);
	}

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}
}
