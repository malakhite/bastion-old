import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from '../common/utils.module';

@Module({
	controllers: [UserController],
	exports: [UserService],
	imports: [TypeOrmModule.forFeature([User]), ConfigModule, UtilsModule],
	providers: [UserService],
})
export class UserModule {}
