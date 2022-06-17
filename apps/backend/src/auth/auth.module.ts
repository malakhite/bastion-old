import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';

@Module({
	controllers: [AuthController],
	exports: [AuthService],
	imports: [
		ConfigModule,
		PassportModule.register({ session: true }),
		UserModule,
	],
	providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
