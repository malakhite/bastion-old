import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/entities/user.entity';

export const ROLES_KEY = 'role';
export const Roles = (...args: Role[]) => SetMetadata(ROLES_KEY, args);
