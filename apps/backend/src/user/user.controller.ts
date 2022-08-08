import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SessionGuard } from '../auth/guards/session.guard';
import { Role } from './entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'users', version: '1' })
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(SessionGuard)
	@Roles(Role.ADMIN)
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}

	@Get()
	async findAll() {
		return await this.userService.findAll();
	}

	@Get(':email')
	async findOne(@Param('email') email: string) {
		return await this.userService.findOneByEmail(email);
	}

	@UseGuards(SessionGuard)
	@Roles(Role.ADMIN)
	@Patch(':email')
	async update(
		@Param('email') email: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return await this.userService.update(email, updateUserDto);
	}

	@UseGuards(SessionGuard)
	@Roles(Role.ADMIN)
	@Delete(':email')
	async remove(@Param('email') email: string) {
		return await this.userService.remove(email);
	}
}
