import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseInterceptors,
	ClassSerializerInterceptor,
	UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { Roles, ValidRole } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'post', version: '1' })
export class PostController {
	constructor(private readonly postService: PostService) {}

	@UseGuards(JwtAuthGuard, RoleGuard)
	@Roles(ValidRole.ADMIN, ValidRole.USER)
	@Post()
	async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
		return await this.postService.create(createPostDto);
	}

	@UseGuards(JwtAuthGuard, RoleGuard)
	@Roles(ValidRole.ADMIN, ValidRole.USER)
	@Get('unpublished')
	async findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
		if (skip && take) {
			return await this.postService.findAll(+take, +skip);
		}
		return await this.postService.findAll();
	}

	@Get()
	async findAllActivePosts(
		@Query('skip') skip?: string,
		@Query('take') take?: string,
	) {
		if (skip && take) {
			return await this.postService.findAllPublishedPosts(+take, +skip);
		}
		return await this.postService.findAllPublishedPosts();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postService.findOne(id);
	}

	@UseGuards(JwtAuthGuard, RoleGuard)
	@Roles(ValidRole.ADMIN, ValidRole.USER)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(id, updatePostDto);
	}

	@UseGuards(JwtAuthGuard, RoleGuard)
	@Roles(ValidRole.ADMIN, ValidRole.USER)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postService.remove(id);
	}
}
