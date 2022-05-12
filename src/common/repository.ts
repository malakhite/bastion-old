import { FastifyInstance } from 'fastify';
import type { Sql } from 'postgres';

export abstract class Repository {
	protected sql: Sql<{}>;
	protected abstract table_name: string;
	protected readonly fastify: FastifyInstance;

	constructor(instance: FastifyInstance) {
		this.fastify = instance;
		this.sql = instance.db;
	}
}
