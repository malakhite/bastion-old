import 'multer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { AssetModule } from '../asset/asset.module';
import { AuthModule } from '../auth/auth.module';
import configuration from '../config';
import { PostModule } from '../post/post.module';
import { UserSubscriber } from '../user/entities/user.subscriber';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { S3Service } from '../asset/s3.service';

@Module({
	controllers: [AppController],
	imports: [
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
		AssetModule,
		AuthModule,
		PostModule,
		UserModule,
	],
	providers: [AppService],
})
export class AppModule {}
