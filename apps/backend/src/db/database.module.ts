import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { User } from '../user/entities/user.entity';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: function dbFactory(configService: ConfigService) {
				return {
					type: 'postgres',
					url: configService.get('DATABASE_URL'),
					synchronize: Boolean(configService.get('SYNCHRONIZE_DB')),
					entities: [User],
					ssl: {
						ca: readFileSync('./bastion-do.crt').toString(),
					},
				};
			},
		}),
	],
})
export class DatabaseModule {}
