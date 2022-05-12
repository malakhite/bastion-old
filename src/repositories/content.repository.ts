import { Repository } from 'common/repository';
import { PostgresError } from 'postgres';
import { BadRequestException } from 'common/exceptions';
import type { FastifyInstance } from 'fastify';
import type {
	CreatePost,
	ContentDb,
	Post,
	UpdatePost,
	PostContentAuthorJoin,
} from 'schemas/content.schema';

export class ContentRepository extends Repository {
	protected readonly table_name = 'content';
	private readonly postColumns = [
		'p.id',
		'p.content_id',
		'u.email',
		'u.name',
		'u.role_id',
		'c.slug',
		'p.title',
		'p.post_text',
		'p.post_json',
		'c.created_at',
		'c.published_at',
		'c.updated_at',
		'c.deleted_at',
	];

	constructor(instance: FastifyInstance) {
		super(instance);
	}

	formatPost(dbPosts: PostContentAuthorJoin[]): Post[] {
		const posts: Post[] = dbPosts.map((dbPost) => {
			const post: Post = {
				id: dbPost.id,
				content_id: dbPost.content_id,
				author: {
					id: dbPost.author_id,
					email: dbPost.email,
					name: dbPost.name,
					role_id: dbPost.role_id,
				},
				slug: dbPost.slug,
				title: dbPost.title,
				post_text: dbPost.post_text,
				post_json: dbPost.post_json,
				created_at: dbPost.created_at,
				published_at: dbPost.published_at,
				updated_at: dbPost.updated_at,
				deleted_at: dbPost.deleted_at,
			};
			return post;
		});

		return posts;
	}

	async findAllPublishedPosts() {
		const posts = await this.sql<PostContentAuthorJoin[]>`
			select ${this.sql(this.postColumns)},
			u.id as author_id
			from posts p
			inner join content c on p.content_id = c.id
			inner join users u on c.author_id = u.id
			where c.published_at <= now()
			and c.deleted_at is null or c.deleted_at >= now()
			order by c.published_at desc;
		`;

		return this.formatPost(posts);
	}

	async findAllPosts() {
		const posts = await this.sql<PostContentAuthorJoin[]>`
			select ${this.sql(this.postColumns)},
			u.id as author_id
			from posts p
			inner join content c on p.content_id = c.id
			inner join users u on c.author_id = u.id
			order by c.created_at desc;
		`;

		return this.formatPost(posts);
	}

	async findPostById(id: string) {
		const posts = await this.sql<PostContentAuthorJoin[]>`
			select ${this.sql(this.postColumns)},
			u.id as author_id
			from posts p
			inner join content c on p.content_id = c.id
			inner join users u on c.author_id = u.id
			where p.id = ${id};
		`;

		return this.formatPost(posts);
	}

	async findPostBySlug(slug: string) {
		const posts = await this.sql<PostContentAuthorJoin[]>`
			select ${this.sql(this.postColumns)},
			u.id as author_id
			from posts p
			inner join content c on p.content_id = c.id
			inner join users u on c.author_id = u.id
			where c.slug = ${slug};
		`;

		return this.formatPost(posts);
	}

	async creatPost(createPostDto: CreatePost) {
		const { author_id, post_json, post_text, published_at, slug, title } = createPostDto;
		try {
			const newPostId = await this.sql.begin(async (sql) => {
				const [content] = await sql<{ id: string }[]>`
					insert into content (content_type, author_id, slug, published_at)
					values
						(1, ${author_id}, ${slug}, ${published_at || null})
					returning id;
				`;

				const [post] = await sql<{ id: string }[]>`
					insert into posts (content_id, title, post_text, post_json)
					values
						(${content.id}, ${title}, ${post_text}, ${(post_json && JSON.stringify(post_json)) || null})
					returning id;
				`;

				return post.id;
			});

			return await this.findPostById(newPostId);
		} catch (e) {
			if (
				e instanceof PostgresError &&
				e.code === '23505' &&
				e.message.includes('content_slug_key')
			) {
				throw new BadRequestException(
					'This slug is already in use. Please select a different slug.',
				);
			}
			throw e;
		}
	}

	async updatePost(id: string, updatePostDto: UpdatePost) {
		const [{ author, ...existingPost }] = await this.findPostById(id);
		const newPost = {
			...existingPost,
			author_id: author.id,
			...updatePostDto,
			updated_at: new Date().toISOString(),
		};

		const { content_id, author_id, post_json, post_text, published_at, updated_at, slug, title } =
			newPost;
		await this.sql.begin((sql) => [
			sql`
				update content
				set author_id = ${author_id}, slug = ${slug}, published_at = ${published_at}, updated_at = ${updated_at}
				where id = ${content_id}
			`,
			sql`
				update posts
				set title = ${title}, post_text = ${post_text}, post_json = ${
				(post_json && JSON.stringify(post_json)) || null
			}
				where id = ${id}
			`,
		]);

		const updatedPost = await this.findPostById(id);
		return updatedPost;
	}

	async deletePost(id: string) {
		await this.sql.begin(async (sql) => {
			const [content] = await sql<ContentDb[]>`
				select content_id
				from posts
				where id = ${id};
			`;

			await sql`
				update content
				set deleted_at = ${new Date()}
				where id = ${content.id};
			`;
		});

		const updatedPost = await this.findPostById(id);
		return updatedPost;
	}
}
