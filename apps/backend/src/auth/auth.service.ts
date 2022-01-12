import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Role } from './entities/role.entity';

@Injectable()
export class AuthService {
	private roles!: Role[];
	private adminRole!: Role;
	private userRole!: Role;
	private guestRole!: Role;

	constructor(
		@InjectRepository(Role)
		private roleRepository: Repository<Role>,
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<User | undefined> {
		const user = await this.userService.findOneByEmail(email);
		if (user && (await argon2.verify(user.password, pass))) {
			return user;
		}
	}

	async login(user: User) {
		const payload = {
			email: user.email,
			sub: user.id,
			role: user.role.name,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async populateRoleData() {
		this.roles = await this.roleRepository.find();
		const adminRole = this.roles.find((role) => role.name === 'admin');
		if (!adminRole) {
			throw new InternalServerErrorException(
				'Admin role is missing from database',
			);
		}

		const userRole = this.roles.find((role) => role.name === 'user');
		if (!userRole) {
			throw new InternalServerErrorException(
				'User role is missing from database',
			);
		}

		const guestRole = this.roles.find((role) => role.name === 'guest');
		if (!guestRole) {
			throw new InternalServerErrorException(
				'Guest role is missing from database',
			);
		}

		this.adminRole = adminRole;
		this.userRole = userRole;
		this.guestRole = guestRole;
	}
}
