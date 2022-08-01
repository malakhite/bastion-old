import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import passport from 'passport';
import { AppModule } from './app.module';
import { SessionService } from './auth/session.service';
import { QueryFailedExceptionFilter } from './database/exceptions/postgres-exceptions.filter';

export const BASTION_SESSION = 'bastion-session';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

	const configService = app.get(ConfigService);
	const typeormStore = app.get(SessionService).getTypeormStore();

	app.enableCors({ origin: true });
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useGlobalFilters(new QueryFailedExceptionFilter());
	app.useGlobalInterceptors(new LoggerErrorInterceptor());
	app.enableVersioning({ type: VersioningType.URI });
	app.useLogger(app.get(Logger));
	app.use(
		session({
			name: BASTION_SESSION,

			secret: configService.get<string>('SESSION_SECRET'),
			cookie: {
				maxAge:
					Number.parseInt(configService.get<string>('SESSION_TTL'), 10) * 1000,
				sameSite: 'lax',
				secure: configService.get<string>('NODE_ENV') === 'production',
			},
			resave: false,
			saveUninitialized: true,
			store: typeormStore,
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());
	await app.listen(3333);
}
bootstrap();
