import 'multer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import * as Joi from 'joi';

import configuration from '../config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	controllers: [AppController],
	imports: [
		ConfigModule.forRoot({
			cache: true,
			expandVariables: true,
			isGlobal: true,
			load: [configuration],
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().required(),
				BACKEND_HOST: Joi.string().required(),
				BACKEND_PORT: Joi.number().required(),
				DATABASE_HOST: Joi.string().required(),
				DATABASE_PORT: Joi.number().required(),
				DATABASE_USERNAME: Joi.string().required(),
				DATABASE_PASSWORD: Joi.string().required(),
				JWT_SECRET: Joi.string().required(),
				SESSION_SECRET: Joi.string().required(),
				REDIS_HOST: Joi.string().required(),
				REDIS_PORT: Joi.number().required(),
				AWS_SECRET_ACCESS_KEY: Joi.string().required(),
				AWS_ACCESS_KEY_ID: Joi.string().required(),
				AWS_REGION: Joi.string().required(),
				S3_BUCKET_NAME: Joi.string().required(),
			}),
		}),
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (
				configService: ConfigService<ReturnType<typeof configuration>>,
			) => {
				return {
					pinoHttp:
						configService.get('node_env') === 'development'
							? {
									transport: {
										target: 'pino-pretty',
										options: {
											colorize: true,
											levelFirst: true,
											translateTime: true,
										},
									},
							  }
							: {},
				};
			},
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (
				configService: ConfigService<ReturnType<typeof configuration>>,
			) => ({
				type: 'postgres',
				host: configService.get('database.host'),
				port: configService.get('database.port'),
				username: configService.get('database.username'),
				password: configService.get('database.password'),
				synchronize: configService.get('database.synchronize'),
				autoLoadEntities: true,
			}),
		}),
		AuthModule,
		UserModule,
	],
	providers: [AppService],
})
export class AppModule {}
