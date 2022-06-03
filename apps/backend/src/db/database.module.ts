import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: function dbFactory(configService: ConfigService) {
				return {
					type: 'postgres',
					url: configService.get('DATABASE_URL'),
					autoLoadEntities: true,
					synchronize: Boolean(configService.get('SYNCHRONIZE_DB')),
					ssl: {
						ca: readFileSync('./bastion-do.crt').toString(),
					},
				};
			},
		}),
	],
})
export class DatabaseModule {}
