/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.enableVersioning({
		type: VersioningType.URI,
	});
	const config = app.get(ConfigService);
	const host = config.get('HOST');
	const port = config.get('PORT');
	await app.listen(port, host);
	Logger.log(
		`🚀 Application is running on: http://${host}:${port}/${globalPrefix}`,
	);
}

bootstrap();
