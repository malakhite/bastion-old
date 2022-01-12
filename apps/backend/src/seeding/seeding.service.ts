import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from 'typeorm';
import { Role } from '../auth/entities/role.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SeedingService {
	constructor(
		private readonly configService: ConfigService,
		private readonly entityManager: EntityManager,
	) {}

	private seedRoles: Role[] = [
		new Role({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			id: this.configService.get<string>('seeds.roles.admin')!,
			name: 'admin',
			description: 'The admin user has all permissions',
		}),
		new Role({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			id: this.configService.get<string>('seeds.roles.user')!,
			name: 'user',
			description: 'Users have view permission for everything',
		}),
		new Role({
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			id: this.configService.get<string>('seeds.roles.guest')!,
			name: 'guest',
			description: 'Guests can only view non-sensitive information',
		}),
	];

	private seedUsers: User[] = [
		new User({
			id: this.configService.get<string>('seeds.user.admin.id'),
			email: this.configService.get<string>('seeds.user.admin.email'),
			name: this.configService.get<string>('seeds.user.admin.name'),
			password: this.configService.get<string>(
				'seeds.user.admin.password',
			),
			role: this.seedRoles[0],
		}),
		new User({
			id: this.configService.get<string>('seeds.user.test.id'),
			email: this.configService.get<string>('seeds.user.test.email'),
			name: this.configService.get<string>('seeds.user.test.name'),
			password: this.configService.get<string>(
				'seeds.user.test.password',
			),
			role: this.seedRoles[2],
		}),
	];

	async seed(): Promise<void> {
		await this.entityManager.save(Role, this.seedRoles);
		await Promise.all([this.entityManager.save(User, this.seedUsers)]);
	}
}
