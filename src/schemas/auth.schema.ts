import { Static, Type } from '@sinclair/typebox';

export const LoginSchema = Type.Object({
	email: Type.String({ format: 'email' }),
	password: Type.String(),
});
export type Login = Static<typeof LoginSchema>;
