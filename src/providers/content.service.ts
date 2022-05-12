import { FastifyInstance } from 'fastify';
import { ContentRepository } from 'repositories/content.repository';
import { CreatePost, UpdatePost } from 'schemas/content.schema';

export class ContentService {
	private readonly contentRepository: ContentRepository;
	private readonly fastify: FastifyInstance;

	constructor(instance: FastifyInstance) {
		this.fastify = instance;
		this.contentRepository = new ContentRepository(this.fastify);
	}

	// Posts
	async createPost(createPostDto: CreatePost) {
		const post = await this.contentRepository.creatPost(createPostDto);
		return post;
	}

	async findPostById(id: string) {
		const post = await this.contentRepository.findPostById(id);
		return post;
	}

	async findPostBySlug(slug: string) {
		const post = await this.contentRepository.findPostBySlug(slug);
		return post;
	}

	async findAllPublishedPosts() {
		const posts = await this.contentRepository.findAllPublishedPosts();
		return posts;
	}

	async findAllPosts() {
		const posts = await this.contentRepository.findAllPosts();
		return posts;
	}

	async updatePost(id: string, updatePostDto: UpdatePost) {
		const post = await this.contentRepository.updatePost(id, updatePostDto);
		return post;
	}

	async deletePost(id: string) {
		const deletedPost = await this.contentRepository.deletePost(id);
		return deletedPost;
	}
}
