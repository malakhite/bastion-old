import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from './auth.utils';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	private readonly logger = new Logger(UsersService.name);

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async allUsers(): Promise<User[]> {
		return this.userRepository.find();
	}

	async findUserByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (user === null) {
			throw new NotFoundException(`User with email '${email}' not found.`);
		}
		return user;
	}

	async findUserById(id: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (user === null) {
			throw new NotFoundException(`User with id '${id}' not found.`);
		}
		return user;
	}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const user = await this.userRepository.create(createUserDto);
		user.password = await hashPassword(createUserDto.password);
		return this.userRepository.save(user);
	}

	async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		if (updateUserDto.password) {
			updateUserDto.password = await hashPassword(updateUserDto.password);
		}
		const existingUser = await this.userRepository.findOne({ where: { id } });
		if (existingUser === null) {
			throw new NotFoundException(`User with id '${id}' not found.`);
		}
		const updatedUserObject = { ...existingUser, ...updateUserDto };
		const updatedUser = await this.userRepository.save(updatedUserObject);

		// not sure why the password keeps getting returned just on the update,
		// but this hard deletes it from the object
		delete updatedUser.password;
		return updatedUser;
	}

	async deleteUser(id: string): Promise<User> {
		const userToDelete = await this.userRepository.findOne({ where: { id } });
		if (userToDelete === null) {
			throw new NotFoundException(`User with id '${id}' not found.`);
		}
		const deleteResult = await this.userRepository.remove(userToDelete);
		if (!(deleteResult instanceof User)) {
			throw new InternalServerErrorException(
				`Something went wrong.`,
				deleteResult,
			);
		}
		return deleteResult;
	}
}
