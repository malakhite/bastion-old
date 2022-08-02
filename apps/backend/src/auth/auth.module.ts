import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { SessionService } from './session.service';

@Module({
	controllers: [AuthController],
	exports: [AuthService, SessionService],
	imports: [
		ConfigModule,
		PassportModule.register({ session: true }),
		TypeOrmModule.forFeature([Session]),
		UserModule,
	],
	providers: [AuthService, LocalStrategy, SessionService],
})
export class AuthModule {}
