export interface User {
	id: string;
	email: string;
	name: string;
	password: string;
	is_active: boolean;
	is_admin: boolean;
	created_at: string;
	updated_at: string;
}

export type ReturnUser = Omit<User, 'password'>;

export type CreateUserDto = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export type UpdateUserDto = Partial<CreateUserDto>;
