import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Post,
	Put,
	Req,
	Session,
} from '@nestjs/common';
import { Request } from 'express';
import { Session as ExpressSession } from 'express-session';
import { CacheService } from './cache.service';
import { Cache } from './entities/cache.entity';

interface CacheRequestBody {
	data: Record<string, unknown>;
}

@Controller({ path: 'cache', version: '1' })
export class CacheController {
	private readonly logger = new Logger(CacheController.name);

	constructor(private readonly cacheService: CacheService) {}

	@Post()
	async create(
		@Req() req: Request,
		@Body() newCache: unknown,
	): Promise<Cache> {
		const sessionId = req.sessionID;
		const cache = await this.cacheService.create(sessionId, newCache);

		return cache;
	}

	@Get()
	async fetchCache(@Req() req: Request): Promise<Cache> {
		const sessionId = req.sessionID;
		const cache = await this.cacheService.fetchCache(sessionId);

		return cache;
	}

	@Put()
	async createOrUpdateCache(
		@Session() session: ExpressSession,
		@Body() body: CacheRequestBody,
	): Promise<void> {
		const { data } = body;
		return await this.cacheService.createOrUpdateCache(session.id, data);
	}

	@Delete()
	async deleteCache(@Req() req: Request): Promise<void> {
		const sessionId = req.sessionID;
		return await this.cacheService.removeCache(sessionId);
	}
}
