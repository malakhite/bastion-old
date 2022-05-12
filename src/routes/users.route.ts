import { Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import { UsersService } from 'providers/users.service';
import {
	CreateUserSchema,
	CreateUser,
	Role,
	UpdateUserSchema,
	UpdateUser,
	UserEmailSchema,
	UserEmail,
	UserIdSchema,
	UserId,
	UserReplySchema,
	UserReply,
} from 'schemas/user.schema';

interface UserRouteOptions extends FastifyPluginOptions {
	usersService: UsersService;
}

export const userRoutes: FastifyPluginAsync<UserRouteOptions> = async function (server, options) {
	const { usersService } = options;

	server.route<{ Reply: UserReply[] }>({
		method: 'GET',
		url: '/list',
		schema: {
			response: {
				200: Type.Array(UserReplySchema),
			},
		},
		handler: async function findAll(_request, reply) {
			const users = await usersService.findAll();
			return users;
		},
	});

	server.route<{ Params: UserId; Reply: UserReply[] }>({
		method: 'GET',
		url: '/id/:id',
		schema: {
			params: UserIdSchema,
			response: {
				200: Type.Array(UserReplySchema),
			},
		},
		handler: async function findOneById(request, _reply) {
			const user = await usersService.findOneById(request.params.id);
			return user;
		},
	});

	server.route<{ Params: UserEmail; Reply: UserReply[] }>({
		method: 'GET',
		url: '/email/:email',
		schema: {
			params: UserEmailSchema,
			response: {
				200: Type.Array(UserReplySchema),
			},
		},
		handler: async function findOneByEmail(request, _reply) {
			const user = await usersService.findOneByEmail(request.params.email);
			return user;
		},
	});

	server.route<{ Body: CreateUser; Reply: UserReply[] }>({
		method: 'POST',
		url: '/create',
		schema: {
			body: CreateUserSchema,
			response: {
				200: Type.Array(UserReplySchema),
			},
		},
		handler: async function createUser(request, _reply) {
			const newUser = await usersService.createUser(request.body);
			return newUser;
		},
	});

	server.route<{ Body: UpdateUser; Params: UserId; Reply: UserReply[] }>({
		method: 'PATCH',
		url: '/update/:id',
		schema: {
			body: UpdateUserSchema,
			params: UserIdSchema,
			response: {
				200: Type.Array(UserReplySchema),
			},
		},
		handler: async function updateUser(request, _reply) {
			const updatedUser = await usersService.updateUser(request.params.id, request.body);
			return updatedUser;
		},
	});

	const UpdateRoleParams = Type.Object({
		id: Type.String({ format: 'uuid' }),
		role: Type.Enum(Role),
	});
	type UpdateRoleParamsType = Static<typeof UpdateRoleParams>;
	server.route<{ Params: UpdateRoleParamsType; Reply: UserReply[] }>({
		method: 'PATCH',
		url: '/update/:id/role/:role',
		schema: {
			params: UpdateRoleParams,
			response: {
				200: Type.Array(UserReplySchema),
			},
		},
		handler: async function updateRole(request, _reply) {
			const updatedUser = await usersService.changeRole(request.params.id, request.params.role);
			return updatedUser;
		},
	});

	server.route<{ Params: UserId; Reply: UserReply[] }>({
		method: 'DELETE',
		url: '/delete/:id',
		schema: {
			params: UserIdSchema,
			response: {
				200: Type.Array(UserReplySchema),
			},
		},
		handler: async function deleteUser(request, _reply) {
			const deletedUser = await usersService.deleteUser(request.params.id);
			return deletedUser;
		},
	});
};
