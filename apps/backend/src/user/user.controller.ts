import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
	Query,
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
@UseGuards(SessionGuard)
@Roles(Role.ADMIN)
@Controller({ path: 'users', version: '1' })
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}

	@Get()
	async findAll(@Query('email') email?: string) {
		if (email) {
			const user = await this.userService.findOneByEmail(email);
			if (user) {
				return user;
			}
			throw new NotFoundException(`User with email '${email}' not found`);
		}
		return await this.userService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const user = await this.userService.findOne(id);
		if (user) {
			return user;
		}
		throw new NotFoundException(`User with id '${id}' not found`);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return await this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.userService.remove(id);
	}
}
