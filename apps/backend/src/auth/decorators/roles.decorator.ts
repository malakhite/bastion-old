import { SetMetadata } from '@nestjs/common';

export enum ValidRole {
	GUEST = 'guest',
	USER = 'user',
	ADMIN = 'admin',
}

export const ROLES_KEY = 'roles';
export const Roles = (...args: ValidRole[]) => SetMetadata('roles', args);
