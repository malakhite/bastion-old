import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { Role } from '../../user/entities/user.entity';
import { IRequestWithUser } from '../interfaces';

@Injectable()
export class SelfGuard implements CanActivate {
	constructor(private userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context
			.switchToHttp()
			.getRequest<IRequestWithUser & { params: { id: number } }>();

		const user = await this.userService.findOneById(request.user.id);

		if (
			user &&
			(user.id === request.params.id || user.role === Role.OWNER)
		) {
			return true;
		}

		throw new ForbiddenException();
	}
}
