import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';
import { Cache } from './entities/cache.entity';

@Module({
	controllers: [CacheController],
	exports: [],
	imports: [TypeOrmModule.forFeature([Cache])],
	providers: [CacheService],
})
export class CacheModule {}
