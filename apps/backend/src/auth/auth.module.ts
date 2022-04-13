import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	controllers: [AuthController],
	exports: [AuthService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('ACCESS_TOKEN_SECRET'),
				signOptions: {
					expiresIn: `${configService.get(
						'ACCESS_TOKEN_EXPIRATION',
					)}s`,
				},
			}),
		}),
		PassportModule,
		UserModule,
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
