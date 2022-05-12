import { Static, Type } from '@sinclair/typebox';
import { Nullable } from './generics';

export enum Role {
	OWNER = 1,
	ADMIN = 2,
	USER = 3,
	GUEST = 4,
}

export const UserSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
	email: Type.String({ format: 'email' }),
	password: Type.String(),
	name: Type.String(),
	role_id: Type.Enum(Role),
	created_at: Type.String({ format: 'date-time' }),
	updated_at: Nullable(Type.String({ format: 'date-time' })),
	deleted_at: Nullable(Type.String({ format: 'date-time' })),
});
export type User = Static<typeof UserSchema>;

export const UserIdSchema = Type.Pick(UserSchema, ['id']);
export type UserId = Static<typeof UserIdSchema>;

export const UserEmailSchema = Type.Pick(UserSchema, ['email']);
export type UserEmail = Static<typeof UserEmailSchema>;

export const UserReplySchema = Type.Omit(UserSchema, ['password']);
export type UserReply = Static<typeof UserReplySchema>;

export const CreateUserSchema = Type.Omit(UserSchema, [
	'id',
	'created_at',
	'updated_at',
	'deleted_at',
	'role_id',
]);
export type CreateUser = Static<typeof CreateUserSchema>;

export const UpdateUserSchema = Type.Partial(CreateUserSchema);
export type UpdateUser = Static<typeof UpdateUserSchema>;
