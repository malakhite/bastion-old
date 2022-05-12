import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import { ContentService } from 'providers/content.service';
import {
	CreatePostSchema,
	CreatePost,
	PostReturnSchema,
	PostReturn,
	UpdatePostSchema,
	UpdatePost,
} from 'schemas/content.schema';

interface ContentServiceOptions extends FastifyPluginOptions {
	contentService: ContentService;
}

export const contentRoutes: FastifyPluginAsync<ContentServiceOptions> = async function (
	server,
	options,
) {
	const { contentService } = options;

	server.route<{ Body: CreatePost; Reply: PostReturn[] }>({
		method: 'POST',
		url: '/posts/create',
		schema: {
			body: CreatePostSchema,
			response: {
				200: Type.Array(PostReturnSchema),
			},
		},
		handler: async function createPost(request, reply) {
			const newPost = await contentService.createPost(request.body);
			return newPost;
		},
	});

	server.route<{ Reply: PostReturn[] }>({
		method: 'GET',
		url: '/posts',
		schema: {
			response: {
				200: Type.Array(PostReturnSchema),
			},
		},
		handler: async function findAllPublishedPosts() {
			const posts = await contentService.findAllPublishedPosts();
			return posts;
		},
	});

	server.route<{ Params: { id: string }; Reply: PostReturn[] }>({
		method: 'GET',
		url: '/posts/id/:id',
		schema: {
			params: Type.Object({ id: Type.String({ format: 'uuid' }) }),
			response: {
				200: Type.Array(PostReturnSchema),
			},
		},
		handler: async function getPostById(request, _reply) {
			const post = await contentService.findPostById(request.params.id);
			return post;
		},
	});

	server.route<{ Params: { id: string }; Body: UpdatePost; Reply: PostReturn[] }>({
		method: 'PATCH',
		url: '/posts/update/:id',
		schema: {
			params: Type.Object({ id: Type.String({ format: 'uuid' }) }),
			body: UpdatePostSchema,
			response: {
				200: Type.Array(PostReturnSchema),
			},
		},
		handler: async function updatePost(request, reply) {
			const updatedPost = await contentService.updatePost(request.params.id, request.body);
			return updatedPost;
		},
	});

	server.route<{ Params: { id: string }; Reply: PostReturn[] }>({
		method: 'DELETE',
		url: '/posts/id/:id',
		schema: {
			params: Type.Object({ id: Type.String({ format: 'uuid' }) }),
			response: {
				200: Type.Array(PostReturnSchema),
			},
		},
		handler: async function deletePost(request) {
			const deletedPost = await contentService.deletePost(request.params.id);
			return deletedPost;
		},
	});
};
