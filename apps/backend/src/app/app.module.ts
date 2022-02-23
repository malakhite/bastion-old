import 'multer';
import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import configuration from '../config';
import { AssetModule } from '../asset/asset.module';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryDataModule } from '../country-data/country-data.module';

@Module({
	controllers: [AppController],
	imports: [
		LoggerModule.forRoot({
			pinoHttp:
				process.env.NODE_ENV === 'development'
					? {
							prettyPrint: {
								colorize: true,
								levelFirst: true,
								translateTime: true,
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
		CountryDataModule,
		PostModule,
		UserModule,
	],
	providers: [AppService],
})
export class AppModule {}
