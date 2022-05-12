import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';

const jwtAuth: FastifyPluginAsync = async function jwtAuth(fastify, options) {
	fastify.register(fastifyJwt, { secret: fastify.config.TOKEN_SECRET });
	fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
		try {
			await request.jwtVerify();
		} catch (e) {
			reply.send(e);
		}
	});
};

export const jwtAuthPlugin = fp(jwtAuth);
