import { SetMetadata } from '@nestjs/common';
import { Role } from '../entities/role.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...args: Role[]) => SetMetadata('roles', args);
