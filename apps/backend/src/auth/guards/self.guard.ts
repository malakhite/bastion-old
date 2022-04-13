import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import { JWTData } from '../dto/jwt-data.dto';
import { UserService } from '../../user/user.service';

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
			(user.role.name === 'admin' || user.id === request.params.id)
		) {
			return true;
		}

		throw new ForbiddenException();
	}
}
