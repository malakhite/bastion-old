import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
} from '@nestjs/common';

import type { Request } from 'express';

@Injectable()
export class SessionGuard implements CanActivate {
	private readonly logger: Logger = new Logger(SessionGuard.name);

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		return request.isAuthenticated();
	}
}
