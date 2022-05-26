import 'multer';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../db/database.module';
import { BastionConfigModule } from '../config/config.module';
import { BastionLoggerModule } from '../logger/logger.module';
import { UserModule } from '../user/user.module';

@Module({
	controllers: [AppController],
	imports: [
		BastionConfigModule,
		BastionLoggerModule,
		AuthModule,
		DatabaseModule,
		UserModule,
	],
	providers: [AppService],
})
export class AppModule {}
