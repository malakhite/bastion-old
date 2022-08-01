import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { SessionGuard } from './guards/session.guard';

@Controller({ path: 'users', version: '1' })
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async allUsers(): Promise<User[]> {
		return this.usersService.allUsers();
	}

	@Get(':id')
	async findUserById(@Param('id') id: string): Promise<User> {
		return this.usersService.findUserById(id);
	}

	@UseGuards(SessionGuard)
	@Post()
	async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.createUser(createUserDto);
	}

	@UseGuards(SessionGuard)
	@Patch(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		return this.usersService.updateUser(id, updateUserDto);
	}

	@UseGuards(SessionGuard)
	@Delete(':id')
	async deleteUser(@Param('id') id: string): Promise<User> {
		return this.usersService.deleteUser(id);
	}
}
