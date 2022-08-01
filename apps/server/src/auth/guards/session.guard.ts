import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import type { Request } from 'express';
import { UsersService } from '../users.service';

@Injectable()
export class SessionGuard implements CanActivate {
	private readonly logger = new Logger(SessionGuard.name);

	constructor(private readonly usersService: UsersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request & { session?: { user: string }; user?: User } =
			context.switchToHttp().getRequest();
		if (!request.session?.user) {
			this.logger.debug('The user has no session.');
			throw new UnauthorizedException("You're not logged in");
		}
		try {
			request.user = await this.usersService.findUserByEmail(
				request.session.user,
			);
			return true;
		} catch (e) {
			if (e instanceof NotFoundException) {
				this.logger.debug(
					`The user '${request.session.user}' does not exist, but has a session.`,
				);
				throw new UnauthorizedException("You're not logged in");
			}
			throw e;
		}
	}
}
