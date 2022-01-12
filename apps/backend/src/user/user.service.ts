import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../auth/entities/role.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Role)
		private roleRepository: Repository<Role>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = await this.userRepository.create(createUserDto);
		const role = await this.roleRepository.findOne(createUserDto.role_id);
		if (role) {
			user.role = role;
		} else {
			throw new BadRequestException();
		}

		return await this.userRepository.save(user);
	}

	async findAll(take?: number, skip?: number): Promise<User[]> {
		if (take && skip) {
			return await this.userRepository.find({ skip, take });
		}
		return await this.userRepository.find();
	}

	async findOne(id: string): Promise<User | undefined> {
		return await this.userRepository.findOne(id);
	}

	async findOneByEmail(email: string): Promise<User | undefined> {
		return await this.userRepository.findOne({ email });
	}

	async update(
		id: string,
		updateUserDto: UpdateUserDto,
	): Promise<User | undefined> {
		const userToUpdate = await this.userRepository.findOne(id);

		if (!userToUpdate || id !== userToUpdate.id) {
			return undefined;
		}

		const role =
			updateUserDto.role_id &&
			(await this.roleRepository.findOne(updateUserDto.role_id));

		userToUpdate.email = updateUserDto.email || userToUpdate.email;
		userToUpdate.name = updateUserDto.name || userToUpdate.name;
		userToUpdate.password = updateUserDto.password || userToUpdate.password;
		userToUpdate.role = role || userToUpdate.role;

		return this.userRepository.save(userToUpdate);
	}

	async remove(id: string): Promise<void> {
		await this.userRepository.softDelete(id);
	}
}
