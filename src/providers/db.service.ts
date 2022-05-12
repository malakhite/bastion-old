import { FastifyPluginAsync } from 'fastify';
import postgres from 'postgres';

export const db: FastifyPluginAsync = async function (instance, options) {
	const sql = postgres(instance.config.POSTGRES_URL);
	instance.decorate('db', sql);
};
