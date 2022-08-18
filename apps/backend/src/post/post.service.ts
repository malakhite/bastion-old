import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ImageService } from '../images/images.service';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
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
	) {}

	async create(createPostDto: CreatePostDto): Promise<Post> {
		const author = await this.userService.findOneById(
			createPostDto.author_id,
		);

		if (!author) {
			throw new BadRequestException(
				`Author is required. Unable to find author with id ${createPostDto.author_id}`,
			);
		}

		const post = await this.postRepository.create(createPostDto);
		const postRevision = await this.postRevisionRepository.create(
			createPostDto,
		);

		postRevision.author = author;
		post.author = author;

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

		post.revisions = [postRevision];

		return await this.postRepository.save(post);
	}

	async findAll(take?: number, skip?: number): Promise<PostResponseDto[]> {
		const posts =
			take && skip
				? await this.postRepository.find({
						skip,
						take,
				  })
				: await this.postRepository.find();

		return posts.map((post) => this.createPostResponse(post));
	}

	async findAllPublishedPosts(
		take?: number,
		skip?: number,
	): Promise<PostResponseDto[]> {
		const posts =
			take && skip
				? await this.postRepository.find({
						skip,
						take,
						where: { published_at: LessThanOrEqual(new Date()) },
				  })
				: await this.postRepository.find({
						where: { published_at: LessThanOrEqual(new Date()) },
				  });

		return posts.map((post) => this.createPostResponse(post));
	}

	async findOne(slug: string): Promise<Post | null> {
		return await this.postRepository.findOne({ where: { slug } });
	}

	async update(
		slug: string,
		updatePostDto: UpdatePostDto,
	): Promise<PostResponseDto> {
		const post = await this.postRepository.findOne({ where: { slug } });
		if (post && post.revisions.length > 0) {
			const { id: revisionId, ...latestRevision } =
				post.revisions[post.revisions.length - 1];
			let newRevision = await this.postRevisionRepository.create({
				...latestRevision,
				...updatePostDto,
			});
			newRevision = await this.postRevisionRepository.save(newRevision);

			post.revisions.push(newRevision);
			const savedPost = await this.postRepository.save(post);
			return this.createPostResponse(savedPost);
		} else {
			throw new BadRequestException(`Post with slug '${slug}' not found`);
		}
	}

	async remove(slug: string): Promise<void> {
		const result = await this.postRepository.softDelete({ slug });
		if (result.affected === 0) {
			throw new BadRequestException(`Post with slug '${slug}' not found`);
		}
	}

	private createPostResponse(post: Post): PostResponseDto {
		const { password, ...postAuthor } = post.author;
		const [latestRevision] = post.revisions;
		const postResponse: PostResponseDto = {
			id: post.id,
			slug: post.slug,
			title: latestRevision.title,
			author: postAuthor,
			hero: latestRevision.hero,
			text_json: latestRevision.text_json,
			text: latestRevision.text,
			created_at: post.created_at,
			published_at: post.published_at,
			updated_at: post.updated_at,
		};

		return postResponse;
	}
}
