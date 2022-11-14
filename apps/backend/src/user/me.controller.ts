import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Logger,
	Patch,
	Session,
	UnauthorizedException,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { SessionGuard } from '../auth/guards/session.guard';
import { UserService } from './user.service';

import type { BastionSession } from '../auth/auth.types';
import { UpdateUserDto } from './dto/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'me', version: '1' })
export class MeController {
	private readonly logger = new Logger(MeController.name);

	constructor(private readonly userService: UserService) {}

	@UseGuards(SessionGuard)
	@Get()
	async getMe(@Session() session: BastionSession) {
		if (session.user) {
			return this.userService.findOneByEmail(session.user);
		}

		throw new UnauthorizedException();
	}

	@UseGuards(SessionGuard)
	@Patch()
	async update(
		@Body() updateUserDto: UpdateUserDto,
		@Session() session: BastionSession,
	) {
		const email = session.user;
		return await this.userService.update(email, updateUserDto);
	}
}
