import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from '../user/user.module';
import { PostCategory } from './entities/category.entity';
import { PostRevision } from './entities/post-revision.entity';
import { ImageModule } from '../images/images.module';
import { UtilsModule } from '../common/utils.module';

@Module({
	controllers: [PostController],
	exports: [PostService],
	imports: [
		ImageModule,
		TypeOrmModule.forFeature([Post, PostCategory, PostRevision]),
		UserModule,
		UtilsModule,
	],
	providers: [PostService],
})
export class PostModule {}
