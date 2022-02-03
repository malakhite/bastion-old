import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

@Module({
	controllers: [UserController],
	exports: [UserService],
	imports: [TypeOrmModule.forFeature([User, Role])],
	providers: [UserService],
})
export class UserModule {}
