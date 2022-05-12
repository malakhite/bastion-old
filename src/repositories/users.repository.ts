import { InternalErrorException, NotFoundException } from 'common/exceptions';
import { Repository } from 'common/repository';
import { FastifyInstance } from 'fastify';
import { CreateUser, Role, UpdateUser, User } from 'schemas/user.schema';

export class UsersRepository extends Repository {
	protected readonly table_name = 'users';

	constructor(instance: FastifyInstance) {
		super(instance);
	}

	async findAll() {
		const users = await this.sql<User[]>`
			SELECT * FROM users WHERE deleted_at IS NULL ORDER BY created_at ASC;
		`;

		return users;
	}

	async findOneById(id: string) {
		const users = await this.sql<User[]>`
			SELECT * FROM users WHERE deleted_at IS NULL AND id = ${id};
		`;

		if (users.length > 1) {
			throw new InternalErrorException('Too many users returned.');
		}

		if (users.length === 0) {
			throw new NotFoundException(`No user found with id '${id}'.`);
		}

		return users;
	}

	async findOneByEmail(email: string) {
		const users = await this.sql<User[]>`
			SELECT * FROM users WHERE deleted_at IS NULL AND email = ${email};
		`;

		if (users.length > 1) {
			throw new InternalErrorException('Too many users returned.');
		}

		if (users.length === 0) {
			throw new NotFoundException(`No user found with id '${email}'.`);
		}

		return users;
	}

	async findDeleted() {
		const users = await this.sql<User[]>`
			SELECT * FROM users WHERE deleted_at IS NOT NULL;
		`;

		return users;
	}

	async create(createUserDto: CreateUser) {
		const newUser = await this.sql<User[]>`
			INSERT INTO users ${this.sql(createUserDto)} RETURNING *;
		`;

		return newUser;
	}

	async update(id: string, updateUserDto: UpdateUser) {
		const existingUser = await this.findOneById(id);

		const newUser = {
			...existingUser,
			...updateUserDto,
			updated_at: new Date().toISOString(),
		};

		const updatedUser = await this.sql<User[]>`
			UPDATE users SET ${this.sql(newUser)} where id = ${id} RETURNING *;
		`;

		return updatedUser;
	}

	async changeRole(id: string, newRole: Role) {
		const updatedUser = await this.sql<User[]>`
			UPDATE users SET role_id = ${newRole} where id = ${id} RETURNING *;
		`;

		return updatedUser;
	}

	async delete(id: string) {
		const [user] = await this.findOneById(id);

		const deleteDate = new Date().toISOString();

		user.updated_at = deleteDate;
		user.deleted_at = deleteDate;

		const deletedUser = await this.sql<User[]>`
			UPDATE users SET ${this.sql(user)} WHERE id = ${user.id} RETURNING *;
		`;

		return deletedUser;
	}
}
