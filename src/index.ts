import fastify from 'fastify';
import fp from 'fastify-plugin';
import { fastifyEnv, fastifyEnvOpt } from 'fastify-env';
import { Static, Type } from '@sinclair/typebox';
import type { Sql } from 'postgres';

import { db } from 'providers/db.service';
import { ContentService } from 'providers/content.service';
import { UsersService } from 'providers/users.service';
import { contentRoutes } from 'routes/content.route';
import { userRoutes } from 'routes/users.route';
import { jwtAuthPlugin } from 'plugins/jwt.plugin';

const configSchema = Type.Object({
	PORT: Type.String(),
	HOST: Type.String(),
	TOKEN_SECRET: Type.String(),
	POSTGRES_URL: Type.String(),
});
type ConfigSchema = Static<typeof configSchema>;

const envOptions: fastifyEnvOpt = {
	confKey: 'config',
	schema: Type.Strict(configSchema),
	dotenv: true,
};

declare module 'fastify' {
	interface FastifyInstance {
		authenticate: FastifyJwt;
		config: ConfigSchema;
		db: Sql<{}>;
	}

	interface FastifyJwt {
		payload: { id: string };
	}
}

async function main() {
	const server = fastify({ logger: true });

	await server.register(fastifyEnv, envOptions);
	await server.register(fp(db));
	await server.register(jwtAuthPlugin);

	// Initialize providers
	const usersService = new UsersService(server);
	const contentService = new ContentService(server);

	// Initialize routes
	server.register(userRoutes, { prefix: '/users/v1', usersService: usersService });
	server.register(contentRoutes, { prefix: '/content/v1', contentService: contentService });

	server.listen(server.config.PORT, server.config.HOST, function (err, address) {
		if (err) {
			server.log.error(err);
			process.exit(1);
		}
	});
}

main();
