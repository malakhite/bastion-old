import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ServerConfigModule } from './config/config.module';
import { PostgresModule } from './database/postgres.module';
import { ServerLoggerModule } from './logger/logger.module';

@Module({
	imports: [ServerConfigModule, ServerLoggerModule, PostgresModule, AuthModule],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
})
export class AppModule {}
