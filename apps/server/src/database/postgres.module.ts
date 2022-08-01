import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/auth/entities/session.entity';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get<string>('DATABASE_URL'),
				synchronize: configService.get<boolean>('SYNCHRONIZE'),
				autoLoadEntities: true,
				entities: [Session],
			}),
			inject: [ConfigService],
			imports: [ConfigModule],
		}),
	],
})
export class PostgresModule {}
