import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm';

import { AppModule } from './app/app.module';
import { getRepository } from 'typeorm';
import { Session } from './auth/entities/session.entity';
import configuration from './config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.enableVersioning({
		type: VersioningType.URI,
	});
	const config =
		app.get<ConfigService<ReturnType<typeof configuration>>>(ConfigService);
	app.useLogger(app.get(Logger));
	// const sessionRepository = getRepository(Session);
	// app.use(
	// 	session({
	// 		cookie: {
	// 			httpOnly: true,
	// 		},
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	// 		secret: config.get('session.secret')!,
	// 		store: new TypeormStore().connect(sessionRepository),
	// 	}),
	// );

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const host = process.env.BACKEND_HOST!;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const port = Number.parseInt(process.env.BACKEND_PORT!, 10);
	await app.listen(port, host);
}

bootstrap();
