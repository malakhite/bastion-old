import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { Session } from './entities/session.entity';
import { AuthController } from './auth.controller';
import { SessionService } from './session.service';

@Module({
	controllers: [AuthController, UsersController],
	exports: [],
	imports: [
		TypeOrmModule.forFeature([User, Session]),
		ConfigModule,
		PassportModule.register({ session: true }),
	],
	providers: [AuthService, LocalStrategy, SessionService, UsersService],
})
export class AuthModule {}
