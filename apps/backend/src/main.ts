import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
		cors: { origin: true },
	});

	app.use(
		session({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			secret: process.env.ACCESS_TOKEN_SECRET!,
			resave: false,
			saveUninitialized: false,
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.enableVersioning({
		type: VersioningType.URI,
	});
	app.useLogger(app.get(Logger));

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const host = process.env.HOST!;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const port = Number.parseInt(process.env.PORT!, 10);
	await app.listen(port, host);
}

bootstrap();
