import {
	BadRequestException,
	Injectable,
	Logger,
	OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class UserService implements OnApplicationBootstrap {
	private readonly logger = new Logger(UserService.name);

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
			throw new BadRequestException('Invalid role_id.');
		}

		return await this.userRepository.save(user);
	}

	async findAll(take?: number, skip?: number): Promise<User[]> {
		if (take && skip) {
			return await this.userRepository.find({ skip, take });
		}
		return await this.userRepository.find();
	}

	async findOne(id: string): Promise<User> {
		return await this.userRepository.findOneOrFail({ id });
	}

	async findOneByEmail(email: string): Promise<User> {
		return await this.userRepository.findOneOrFail({ email });
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const userToUpdate = await this.userRepository.findOneOrFail({ id });

		const role =
			(await this.roleRepository.findOne(updateUserDto.role_id)) ||
			userToUpdate.role;

		userToUpdate.email = updateUserDto.email || userToUpdate.email;
		userToUpdate.name = updateUserDto.name || userToUpdate.name;
		userToUpdate.password = updateUserDto.password || userToUpdate.password;
		userToUpdate.role = role;

		return this.userRepository.save(userToUpdate);
	}

	async remove(id: string): Promise<void> {
		await this.userRepository.softDelete(id);
	}

	async onApplicationBootstrap() {
		const roles = [
			{ id: 1, name: 'guest', description: 'Guests can comment.' },
			{
				id: 2,
				name: 'admin',
				description: 'Admin users can do anything.',
			},
		];

		const storedRoles = await this.roleRepository.count();
		if (storedRoles === 0) {
			this.logger.log('No roles stored. Bootstrapping roles.');
			await this.roleRepository.save(roles);
		}

		const storedUsers = await this.userRepository.count();
		if (storedUsers === 0) {
			this.logger.log('No users stored. Adding admin user.');
			const adminRole = await this.roleRepository.findOne(2);
			this.logger.debug(adminRole);
			const defaultAdmin = new User({
				email: process.env.ADMIN_EMAIL,
				name: process.env.ADMIN_NAME,
				password: process.env.ADMIN_PASSWORD,
				is_active: true,
				role: adminRole,
			});
			await this.userRepository.save(defaultAdmin);
		}
	}
}
