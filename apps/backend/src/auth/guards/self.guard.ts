import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { Request } from 'express';
import { JWTData } from '../dto/jwt-data.dto';

@Injectable()
export class SelfGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request: Request & { user: JWTData } = context
			.switchToHttp()
			.getRequest();

		if (
			request.user.role === 'admin' ||
			request.user.sub === request.params.id
		) {
			return true;
		}

		throw new ForbiddenException();
	}
}
