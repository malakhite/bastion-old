import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

import configuration from '../config';
import { SeedingService } from '../seeding/seeding.service';
import { UserSubscriber } from '../user/entities/user.subscriber';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	controllers: [AppController],
	imports: [
		AuthModule,
		ConfigModule.forRoot({
			cache: true,
			envFilePath: resolve(__dirname, '..', '..', '..', '.env'),
			expandVariables: true,
			isGlobal: true,
			load: [configuration],
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
				subscribers: [UserSubscriber],
			}),
		}),
		UserModule,
	],
	providers: [AppService, SeedingService],
})
export class AppModule implements OnApplicationBootstrap {
	constructor(
		private readonly seedingService: SeedingService,
		private readonly authService: AuthService,
	) {}

	async onApplicationBootstrap(): Promise<void> {
		// Order is important here. seed() has to run before populateRoleData()
		await this.seedingService.seed();
		await this.authService.populateRoleData();
	}
}
