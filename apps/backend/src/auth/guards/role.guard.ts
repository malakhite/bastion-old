import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../user/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

import type { UserService } from '../../user/user.service';
import type { IRequestWithUser } from '../interfaces';

@Injectable()
export class RoleGuard implements CanActivate {
	private readonly logger = new Logger(RoleGuard.name);

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

		const request = context.switchToHttp().getRequest<IRequestWithUser>();
		const user = await this.userService.findOneById(request.user.id);
		this.logger.log(user);

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
