import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
	controllers: [AuthController],
	exports: [AuthService],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('jwt.secret'),
				signOptions: { expiresIn: '60s' },
			}),
		}),
		PassportModule,
		TypeOrmModule.forFeature([Role]),
		UserModule,
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
