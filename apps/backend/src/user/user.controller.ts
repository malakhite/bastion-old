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
	Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SelfGuard } from '../auth/guards/self.guard';

@UseInterceptors(ClassSerializerInterceptor)
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
	async findOne(@Req() req: Request, @Param('id') id: string) {
		const user = await this.userService.findOne(id);
		if (user) {
			return user;
		}
		throw new NotFoundException(`User with id '${id}' not found`);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard, SelfGuard)
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return await this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard, SelfGuard)
	async remove(@Param('id') id: string) {
		return await this.userService.remove(id);
	}
}
