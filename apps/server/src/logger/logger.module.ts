import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
	imports: [
		LoggerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					pinoHttp:
						configService.get<string>('NODE_ENV') === 'development'
							? {
									transport: {
										target: 'pino-pretty',
										options: {
											colorize: true,
											levelFirst: true,
											translateTime: true,
										},
									},
									level: configService.get<string>('LOG_LEVEL') || 'info',
							  }
							: {},
				};
			},
		}),
	],
})
export class ServerLoggerModule {}
