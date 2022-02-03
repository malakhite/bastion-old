import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from '../user/user.module';
import { AssetModule } from '../asset/asset.module';

@Module({
	controllers: [PostController],
	exports: [PostService],
	imports: [TypeOrmModule.forFeature([Post]), UserModule, AssetModule],
	providers: [PostService],
})
export class PostModule {}
