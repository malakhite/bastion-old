import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../user/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

import type { Request } from 'express';
import type { JWTData } from '../dto/jwt-data.dto';
import type { UserService } from '../../user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private userService: UserService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles) {
			return true;
		}

		const request: Request & { user: JWTData } = context
			.switchToHttp()
			.getRequest();
		const user = await this.userService.findOne(request.user.sub);

		if (
			user &&
			requiredRoles.some(
				(role) => user.role === role || user.role === Role.OWNER,
			)
		) {
			return true;
		}

		throw new ForbiddenException();
	}
}
