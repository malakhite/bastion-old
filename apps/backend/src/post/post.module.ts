import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from '../user/user.module';
import { AssetModule } from '../asset/asset.module';
import { PostCategory } from './entities/category.entity';
import { PostRevision } from './entities/post-revision.entity';

@Module({
	controllers: [PostController],
	exports: [PostService],
	imports: [
		TypeOrmModule.forFeature([Post, PostCategory, PostRevision]),
		UserModule,
		AssetModule,
	],
	providers: [PostService],
})
export class PostModule {}
