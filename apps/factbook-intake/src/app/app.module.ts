import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from 'nestjs-pino';

import {
	FactbookCategory,
	FactbookCountry,
	FactbookField,
	FactbookFieldType,
	FactbookModule,
	FactbookRegion,
} from '@bastion/factbook';

import configuration from '../config';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			envFilePath: resolve(__dirname, '..', '..', '..', '.env'),
			expandVariables: true,
			isGlobal: true,
			load: [configuration],
		}),
		HttpModule,
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
				entities: [
					FactbookCategory,
					FactbookCountry,
					FactbookField,
					FactbookFieldType,
					FactbookRegion,
				],
			}),
		}),
		FactbookModule,
	],
	providers: [AppService],
})
export class AppModule {}
