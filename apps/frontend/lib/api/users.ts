export enum Role {
	OWNER = 'owner',
	ADMIN = 'admin',
	USER = 'user',
	GUEST = 'guest',
}

export interface UserResponse {
	id: number;
	email: string;
	name: string;
	is_active: boolean;
	role: Role;
	created_at: string;
	updated_at: string;
	deleted_at?: string;
}

export interface CreateUserDto {
	email: string;
	name: string;
	password: string;
	is_active?: boolean;
	role?: Role;
}

export type UpdateUserDto = Partial<CreateUserDto>;
