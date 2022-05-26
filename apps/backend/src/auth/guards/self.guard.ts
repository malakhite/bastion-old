import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import { JWTData } from '../dto/jwt-data.dto';
import { UserService } from '../../user/user.service';
import { Role } from '../../user/entities/user.entity';

@Injectable()
export class SelfGuard implements CanActivate {
	constructor(private userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request & { user: JWTData } = context
			.switchToHttp()
			.getRequest();

		const user = await this.userService.findOne(request.user.sub);

		if (
			user &&
			(user.id === request.params.id || user.role === Role.OWNER)
		) {
			return true;
		}

		throw new ForbiddenException();
	}
}
