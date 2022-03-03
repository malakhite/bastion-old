import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm';

import { AppModule } from './app/app.module';
import { getRepository } from 'typeorm';
import { Session } from './auth/entities/session.entity';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bufferLogs: true });
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.enableVersioning({
		type: VersioningType.URI,
	});
	const config = app.get(ConfigService);
	app.useLogger(app.get(Logger));
	const sessionRepository = getRepository(Session);
	app.use(
		session({
			cookie: {
				httpOnly: true,
			},
			resave: false,
			saveUninitialized: false,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			secret: config.get('SESSION_SECRET')!,
			store: new TypeormStore().connect(sessionRepository),
		}),
	);
	const host = config.get('HOST');
	const port = config.get('PORT');
	await app.listen(port, host);
}

bootstrap();
