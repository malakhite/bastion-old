/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable @typescript-eslint/no-non-null-assertion
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import passport from 'passport';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { BASTION_SESSION } from './config/constants';
import { SessionService } from './auth/session.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
		cors: { origin: true, credentials: true },
	});

	const configService = app.get(ConfigService);
	const typeormStore = app.get(SessionService).getTypeormStore();

	app.use(
		session({
			name: BASTION_SESSION,
			secret: configService.get<string>('SESSION_SECRET')!,
			cookie: {
				maxAge:
					Number.parseInt(
						configService.get<string>('SESSION_TTL')!,
						10,
					) * 1000,
				sameSite: 'lax',
				secure: configService.get<string>('NODE_ENV') === 'production',
			},
			resave: false,
			saveUninitialized: false,
			store: typeormStore,
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.enableVersioning({
		type: VersioningType.URI,
	});
	app.useGlobalInterceptors(new LoggerErrorInterceptor());
	app.useLogger(app.get(Logger));
	app.enableShutdownHooks();

	const host = configService.get<string>('HOST')!;
	const port = configService.get<number>('PORT')!;
	await app.listen(port, host);
}

bootstrap();
