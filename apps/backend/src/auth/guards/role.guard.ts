import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from '../../user/entities/role.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JWTData } from '../dto/jwt-data.dto';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request & { user: JWTData } = context
			.switchToHttp()
			.getRequest();

		const requiredRoles = this.reflector.getAllAndOverride<Role['name'][]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (!requiredRoles) {
			return true;
		}

		return requiredRoles.includes(request.user.sub);
	}
}
