import * as bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';

import { UsersRepository } from 'repositories/users.repository';
import { CreateUser, Role, UpdateUser } from 'schemas/user.schema';

export class UsersService {
	private readonly fastify: FastifyInstance;
	private readonly usersRepository: UsersRepository;
	private saltRounds = 10;

	constructor(instance: FastifyInstance) {
		this.fastify = instance;
		this.usersRepository = new UsersRepository(this.fastify);
	}

	async createUser(createUserDto: CreateUser) {
		const salt = await bcrypt.genSalt(this.saltRounds);
		createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
		return await this.usersRepository.create(createUserDto);
	}

	async findAll() {
		return await this.usersRepository.findAll();
	}

	async findOneById(id: string) {
		return await this.usersRepository.findOneById(id);
	}

	async findOneByEmail(email: string) {
		return await this.usersRepository.findOneByEmail(email);
	}

	async updateUser(id: string, updateUserDto: UpdateUser) {
		if (updateUserDto.password) {
			const salt = await bcrypt.genSalt(this.saltRounds);
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
		}

		return await this.usersRepository.update(id, updateUserDto);
	}

	async changeRole(id: string, newRole: Role) {
		const updatedUser = await this.usersRepository.changeRole(id, newRole);
		return updatedUser;
	}

	async deleteUser(id: string) {
		return await this.usersRepository.delete(id);
	}
}
