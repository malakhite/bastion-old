import 'multer';
import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
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
		LoggerModule.forRoot({
			pinoHttp:
				process.env.NODE_ENV === 'development'
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
		}),
		ConfigModule.forRoot({
			cache: true,
			envFilePath: resolve(__dirname, '..', '..', '..', '.env'),
			expandVariables: true,
			isGlobal: true,
			load: [configuration],
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().required().default('development'),
				HOST: Joi.string().required().default('localhost'),
				PORT: Joi.number().required().default(3333),
				DATABASE_HOST: Joi.string().required().default('localhost'),
				DATABASE_PORT: Joi.number().required().default(5432),
				DATABASE_USERNAME: Joi.string().required(),
				DATABASE_PASSWORD: Joi.string().required(),
				AWS_SECRET_ACCESS_KEY: Joi.string().required(),
				AWS_ACCESS_KEY_ID: Joi.string().required(),
				AWS_REGION: Joi.string().required().default('us-east-1'),
				S3_BUCKET_NAME: Joi.string().required(),
				REDIS_HOST: Joi.string().required().default('localhost'),
				REDIS_PORT: Joi.number().required().default(6379),
			}),
		}),
		ScheduleModule.forRoot(),
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
