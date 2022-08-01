import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
	private readonly logger = new Logger(SessionService.name);
	private readonly typeormStore: TypeormStore;

	constructor(
		private configService: ConfigService,
		@InjectRepository(Session)
		private sessionRepository: Repository<Session>,
	) {
		this.typeormStore = new TypeormStore({
			cleanupLimit: 2,
			limitSubquery: false,
			ttl: this.configService.get<number>('SESSION_TTL'),
		}).connect(sessionRepository);
	}

	getTypeormStore(): TypeormStore {
		return this.typeormStore;
	}
}
