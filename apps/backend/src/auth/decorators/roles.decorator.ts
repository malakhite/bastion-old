import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/entities/role.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...args: Role['name'][]) => SetMetadata(ROLES_KEY, args);
