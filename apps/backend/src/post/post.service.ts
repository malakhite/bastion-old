import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { AssetService } from '../asset/asset.service';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRevision } from './entities/post-revision.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post)
		private postRepository: Repository<Post>,
		private postRevisionRepository: Repository<PostRevision>,
		private assetService: AssetService,
		private userService: UserService,
	) {}

	async create(createPostDto: CreatePostDto): Promise<Post> {
		const post = await this.postRepository.create(createPostDto);
		const postRevision = await this.postRevisionRepository.create(
			createPostDto,
		);

		const author = await this.userService.findOne(createPostDto.author_id);

		if (author) {
			postRevision.author = author;
			post.author = author;
		} else {
			throw new BadRequestException(
				`Author is required. Unable to find author with id ${createPostDto.author_id}`,
			);
		}

		if (createPostDto.hero_id) {
			const hero = await this.assetService.findOne(createPostDto.hero_id);
			if (hero) {
				postRevision.hero = hero;
			} else {
				throw new BadRequestException(
					`Asset with id ${createPostDto.hero_id} not found`,
				);
			}
		}

		post.revisions.push(postRevision);

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

	async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
		const post = await this.postRepository.findOne(id);
		if (post && post.revisions.length > 0) {
			const { id: revisionId, ...latestRevision } =
				post.revisions[post.revisions.length - 1];
			let newRevision = await this.postRevisionRepository.create({
				...latestRevision,
				...updatePostDto,
			});
			newRevision = await this.postRevisionRepository.save(newRevision);

			post.revisions.push(newRevision);
			return this.postRepository.save(post);
		} else {
			throw new BadRequestException(`Post with id ${id} not found`);
		}
	}

	async remove(id: string): Promise<void> {
		const result = await this.postRepository.softDelete(id);
		if (result.affected === 0) {
			throw new BadRequestException(`Post with id ${id} not found`);
		}
	}
}
