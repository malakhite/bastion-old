import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genNanoId } from '../util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';

@Injectable()
export class UserService implements OnApplicationBootstrap {
	private readonly logger = new Logger(UserService.name);

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = await this.userRepository.create(createUserDto);

		return await this.userRepository.save(user);
	}

	async findAll(take?: number, skip?: number): Promise<User[]> {
		if (take && skip) {
			return await this.userRepository.find({ skip, take });
		}
		return await this.userRepository.find();
	}

	async findOne(id: string): Promise<User> {
		return await this.userRepository.findOneOrFail({ where: { id } });
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return await this.userRepository.findOne({ where: { email } });
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const userToUpdate = await this.userRepository.findOneOrFail({
			where: { id },
		});

		userToUpdate.email = updateUserDto.email ?? userToUpdate.email;
		userToUpdate.name = updateUserDto.name ?? userToUpdate.name;
		userToUpdate.password = updateUserDto.password ?? userToUpdate.password;
		userToUpdate.role = updateUserDto.role ?? userToUpdate.role;

		return this.userRepository.save(userToUpdate);
	}

	async remove(id: string): Promise<void> {
		await this.userRepository.softDelete(id);
	}

	async onApplicationBootstrap() {
		const storedUsers = await this.userRepository.count();
		if (storedUsers === 0) {
			this.logger.log('No users stored. Adding owner.');
			const defaultAdmin = new User({
				id: await genNanoId(),
				email: process.env.ADMIN_EMAIL,
				name: process.env.ADMIN_NAME,
				password: process.env.ADMIN_PASSWORD,
				is_active: true,
				role: Role.OWNER,
			});
			await this.userRepository.save(defaultAdmin);
		}
	}
}
