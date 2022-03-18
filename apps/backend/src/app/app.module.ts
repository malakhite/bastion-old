import 'multer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import * as Joi from 'joi';

import configuration from '../config';
import { AssetModule } from '../asset/asset.module';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactbookModule } from '../factbook/factbook.module';

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
		BullModule.forRoot({
			redis: {
				host: 'localhost',
				port: 6379,
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
		AssetModule,
		AuthModule,
		FactbookModule,
		PostModule,
		UserModule,
	],
	providers: [AppService],
})
export class AppModule {}
