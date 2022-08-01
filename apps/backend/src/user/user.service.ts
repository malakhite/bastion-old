import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashidService } from '../common/hashid.service';
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
		private hashidService: HashidService,
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

	async findOne(hashedId: string): Promise<User> {
		const id = this.hashidService.decode(hashedId);
		return await this.userRepository.findOneOrFail({ where: { id } });
	}

	async findOneByEmail(email: string): Promise<User | null> {
		return await this.userRepository.findOne({ where: { email } });
	}

	async update(
		hashedId: string,
		updateUserDto: UpdateUserDto,
	): Promise<User> {
		const id = this.hashidService.decode(hashedId);
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
			const email = this.configService.get<string>('ADMIN_EMAIL');
			const name = this.configService.get<string>('ADMIN_NAME');
			const password = this.configService.get<string>('ADMIN_PASSWORD');

			if (!email || !name || !password) {
				throw new Error(
					'`ADMIN_EMAIL`, `ADMIN_NAME`, and `ADMIN_PASSWORD` must be set when starting the application for the first time.',
				);
			}

			const defaultAdmin = new User();
			(defaultAdmin.email = email),
				(defaultAdmin.name = name),
				(defaultAdmin.password = password),
				(defaultAdmin.is_active = true),
				(defaultAdmin.role = Role.OWNER),
				await this.userRepository.save(defaultAdmin);
		}
	}
}
