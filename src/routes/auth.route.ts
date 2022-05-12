import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import { UsersService } from 'providers/users.service';
import { Login, LoginSchema } from 'schemas/auth.schema';
import { UserReplySchema } from 'schemas/user.schema';

interface AuthRouteOptions extends FastifyPluginOptions {
	usersService: UsersService;
}

export const authRoutes: FastifyPluginAsync<AuthRouteOptions> = async function (server, options) {
	const { usersService } = options;

	server.route<{ Body: Login }>({
		method: 'POST',
		url: '/login',
		schema: {
			body: LoginSchema,
			response: {
				200: Type.Array(UserReplySchema),
			},
		},
		handler: async function login(request, reply) {
			const [user] = await usersService.findOneByEmail(request.body.email);
			return;
		},
	});
};
