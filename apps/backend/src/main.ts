import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
		cors: { origin: true },
	});

	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	app.enableVersioning({
		type: VersioningType.URI,
	});
	app.useLogger(app.get(Logger));

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const host = process.env.BACKEND_HOST!;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const port = Number.parseInt(process.env.BACKEND_PORT!, 10);
	await app.listen(port, host);
}

bootstrap();
