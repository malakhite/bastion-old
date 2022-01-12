import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../auth/entities/role.entity';
import { User } from './entities/user.entity';

@Module({
	controllers: [UserController],
	exports: [UserService],
	imports: [TypeOrmModule.forFeature([Role, User])],
	providers: [UserService],
})
export class UserModule {}
