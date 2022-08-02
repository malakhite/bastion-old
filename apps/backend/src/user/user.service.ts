import {
	Injectable,
	Logger,
	NotFoundException,
	OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';

@Injectable()
export class UserService implements OnApplicationBootstrap {
	private readonly logger = new Logger(UserService.name);

	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private configService: ConfigService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const hash = await argon2.hash(createUserDto.password);
		const user = await this.userRepository.create({
			...createUserDto,
			password: hash,
		});

		return await this.userRepository.save(user);
	}

	async findAll(take?: number, skip?: number): Promise<User[]> {
		if (take && skip) {
			return await this.userRepository.find({ skip, take });
		}
		return await this.userRepository.find();
	}

	async findOneById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}

	async findOneByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}

	async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
		const userToUpdate = await this.userRepository.findOne({
			where: { email },
		});

		if (!userToUpdate) {
			throw new NotFoundException();
		}

		const password = updateUserDto.password
			? await argon2.hash(updateUserDto.password)
			: userToUpdate.password;

		const updatedUser = { ...userToUpdate, ...updateUserDto, password };

		return this.userRepository.save(updatedUser);
	}

	async remove(email: string): Promise<void> {
		const userToRemove = await this.userRepository.findOne({
			where: { email },
		});
		if (!userToRemove) {
			throw new NotFoundException(
				`User with email '${email}' not found.`,
			);
		}
		await this.userRepository.softDelete(userToRemove.id);
	}

	async onApplicationBootstrap() {
		const storedUsers = await this.userRepository.count();
		if (storedUsers === 0) {
			this.logger.log('No users stored. Adding owner.');
			const email = this.configService.get<string>('ADMIN_EMAIL');
			const name = this.configService.get<string>('ADMIN_NAME');
			const password = this.configService.get<string>('ADMIN_PASSWORD');

			if (!email || !name || !password) {
				throw new Error(
					'`ADMIN_EMAIL`, `ADMIN_NAME`, and `ADMIN_PASSWORD` must be set when starting the application for the first time.',
				);
			}

			const defaultAdmin = new User();
			defaultAdmin.email = email;
			defaultAdmin.name = name;
			defaultAdmin.password = await argon2.hash(password);
			defaultAdmin.is_active = true;
			defaultAdmin.role = Role.OWNER;

			await this.userRepository.save(defaultAdmin);
		}
	}
}
