import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { AssetService } from '../asset/asset.service';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post)
		private postRepository: Repository<Post>,
		private assetService: AssetService,
		private userService: UserService,
	) {}

	async create(createPostDto: CreatePostDto): Promise<Post> {
		const post = await this.postRepository.create(createPostDto);

		const author = await this.userService.findOne(createPostDto.author_id);
		if (author) {
			post.current_revision.author = author;
		} else {
			throw new BadRequestException(
				`Author is required. Unable to find author with id ${createPostDto.author_id}`,
			);
		}

		if (createPostDto.hero_id) {
			const hero = await this.assetService.findOne(createPostDto.hero_id);
			if (hero) {
				post.current_revision.hero = hero;
			} else {
				throw new BadRequestException(
					`Asset with id ${createPostDto.hero_id} not found`,
				);
			}
		}

		return await this.postRepository.save(post);
	}

	async findAll(take?: number, skip?: number): Promise<Post[]> {
		if (skip && take) {
			return await this.postRepository.find({ skip, take });
		}
		return await this.postRepository.find();
	}

	async findAllPublishedPosts(take?: number, skip?: number): Promise<Post[]> {
		if (skip && take) {
			return await this.postRepository.find({
				skip,
				take,
				where: { published_at: LessThanOrEqual(new Date()) },
			});
		}
		return await this.postRepository.find({
			where: { published_at: LessThanOrEqual(new Date()) },
		});
	}

	async findOne(id: string): Promise<Post | undefined> {
		return await this.postRepository.findOne(id);
	}

	async update(
		id: string,
		updatePostDto: UpdatePostDto,
	): Promise<Post | undefined> {
		await this.postRepository.update(id, updatePostDto);
		return await this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const result = await this.postRepository.softDelete(id);
		if (result.affected === 0) {
			throw new NotFoundException(`Post with id ${id} not found`);
		}
	}
}
