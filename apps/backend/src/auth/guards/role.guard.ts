import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from '../../user/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request & { user: User } = context
			.switchToHttp()
			.getRequest();

		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles) {
			return true;
		}

		return requiredRoles.map((r) => r.id).includes(request.user.role.id);
	}
}
