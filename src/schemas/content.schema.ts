import { Static, Type } from '@sinclair/typebox';
import { Nullable } from './generics';
import { UserReplySchema, UserSchema } from './user.schema';

export const enum ContentType {
	BLOG = 1,
	STATUS = 2,
	LINK = 3,
	PHOTOGRAPH = 4,
	IMAGE = 5,
	VIDEO = 6,
	DOCUMENT = 7,
	FILE = 8,
}

export const ContentDbSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
	content_type: Type.Integer(),
	author_id: Type.String({ format: 'uuid' }),
	slug: Nullable(Type.String()),
	created_at: Type.String({ format: 'date-time' }),
	published_at: Nullable(Type.String({ format: 'date-time' })),
	updated_at: Nullable(Type.String({ format: 'date-time' })),
	deleted_at: Nullable(Type.String({ format: 'date-time' })),
});
export type ContentDb = Static<typeof ContentDbSchema>;

export const TagDbSchema = Type.Object({
	id: Type.Integer(),
	name: Type.String(),
});
export type TagDb = Static<typeof TagDbSchema>;

export const PostDbSchema = Type.Object({
	id: Type.String({ format: 'uuid' }),
	content_id: Type.String({ format: 'uuid' }),
	title: Type.String(),
	post_text: Type.String(),
	post_json: Nullable(Type.String()),
});
export type PostDb = Static<typeof PostDbSchema>;

export const CreatePostSchema = Type.Object({
	author_id: Type.String({ format: 'uuid' }),
	title: Type.String(),
	slug: Nullable(Type.String()),
	published_at: Nullable(Type.String({ format: 'date-time' })),
	post_text: Type.String(),
	post_json: Nullable(Type.Record(Type.String(), Type.Any())),
});
export type CreatePost = Static<typeof CreatePostSchema>;

export const UpdatePostSchema = Type.Partial(CreatePostSchema);
export type UpdatePost = Static<typeof UpdatePostSchema>;

export const PostSchema = Type.Object({
	id: Type.String({ format: 'uuid' }), // refers to posts.id
	content_id: Type.String({ format: 'uuid' }),
	author: Type.Omit(UserReplySchema, ['created_at', 'updated_at', 'deleted_at']),
	slug: Nullable(Type.String()),
	title: Type.String(),
	post_text: Type.String(),
	post_json: Nullable(Type.String()),
	created_at: Type.String({ format: 'date-time' }),
	published_at: Nullable(Type.String({ format: 'date-time' })),
	updated_at: Nullable(Type.String({ format: 'date-time' })),
	deleted_at: Nullable(Type.String({ format: 'date-time' })),
});
export type Post = Static<typeof PostSchema>;

export const PostContentAuthorJoinSchema = Type.Intersect([
	Type.Omit(ContentDbSchema, ['id']),
	PostDbSchema,
	Type.Omit(UserReplySchema, ['id', 'created_at', 'updated_at', 'deleted_at']),
]);
export type PostContentAuthorJoin = Static<typeof PostContentAuthorJoinSchema>;

export const PostReturnSchema = Type.Omit(PostSchema, ['content_id']);
export type PostReturn = Static<typeof PostReturnSchema>;
