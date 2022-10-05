import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

type SessionRequest = Request & { session?: { user: string }; user?: User };

@Injectable()
export class SessionGuard implements CanActivate {
	private readonly logger: Logger = new Logger(SessionGuard.name);

	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<SessionRequest>();

		if (!request.session.user) {
			throw new UnauthorizedException("You're not logged in");
		}

		try {
			request.user = await this.userService.findOneByEmail(
				request.session.user,
			);

			return true;
		} catch (e) {
			if (e instanceof NotFoundException) {
				throw new UnauthorizedException("You're not logged in");
			}

			throw e;
		}
	}
}
