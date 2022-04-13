import 'reflect-metadata';
import { Connection } from 'typeorm';

export const AppDataSource = new Connection({
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number.parseInt(process.env.POSTGRES_PORT, 10),
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
});
