import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { HashidService } from '../common/hashid.service';
import { ImageService } from '../images/images.service';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRevision } from './entities/post-revision.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
	constructor(
		private imageService: ImageService,
		@InjectRepository(Post)
		private postRepository: Repository<Post>,
		@InjectRepository(PostRevision)
		private postRevisionRepository: Repository<PostRevision>,
		private userService: UserService,
		private hashidService: HashidService,
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
			const hero = await this.imageService.findOne(createPostDto.hero_id);
			if (hero) {
				postRevision.hero = hero;
			} else {
				throw new BadRequestException(
					`Image with id ${createPostDto.hero_id} not found`,
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

	async findOne(hashedId: string): Promise<Post | null> {
		const id = this.hashidService.decode(hashedId);
		return await this.postRepository.findOne({ where: { id } });
	}

	async update(
		hashedId: string,
		updatePostDto: UpdatePostDto,
	): Promise<Post> {
		const id = this.hashidService.decode(hashedId);
		const post = await this.postRepository.findOne({ where: { id } });
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

	async remove(hashedId: string): Promise<void> {
		const id = this.hashidService.decode(hashedId);
		const result = await this.postRepository.softDelete(id);
		if (result.affected === 0) {
			throw new BadRequestException(`Post with id ${id} not found`);
		}
	}
}
