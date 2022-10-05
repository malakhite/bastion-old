import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from './entities/cache.entity';

@Injectable()
export class CacheService {
	private readonly logger = new Logger(CacheService.name);

	constructor(
		@InjectRepository(Cache)
		private cacheRepository: Repository<Cache>,
	) {}

	async create(sessionId: string, cacheData: unknown): Promise<Cache> {
		const cache = await this.cacheRepository.create({
			sessionId,
			cacheData,
		});
		return await this.cacheRepository.save(cache);
	}

	async createOrUpdateCache(
		sessionId: string,
		cacheData: Record<string, unknown>,
	): Promise<void> {
		const cache = { sessionId, cacheData };
		await this.cacheRepository.upsert(cache, {
			conflictPaths: ['sessionId'],
			skipUpdateIfNoValuesChanged: true,
		});
	}

	async fetchCache(sessionId: string): Promise<Cache> {
		const cache = await this.cacheRepository.findOne({
			where: { sessionId },
		});
		if (!cache) {
			throw new NotFoundException();
		}
		return cache;
	}

	async updateCache(sessionId: string, cacheData: unknown): Promise<Cache> {
		const cache = await this.cacheRepository.findOne({
			where: { sessionId },
		});
		if (!cache) {
			throw new NotFoundException();
		}

		const updatedCache = {
			...cache,
			cacheData,
		};

		const savedCache = await this.cacheRepository.save(updatedCache);
		return savedCache;
	}

	async removeCache(sessionId: string): Promise<void> {
		await this.cacheRepository.delete({ sessionId });
	}
}
