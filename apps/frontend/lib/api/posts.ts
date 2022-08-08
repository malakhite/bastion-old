import { baseUrl } from './common';
import { ImageResponse } from './images';
import { UserResponse } from './users';

export interface PostResponse {
	slug: string;
	title: string;
	author: UserResponse;
	hero: ImageResponse | null;
	text_json: string | null;
	text: string;
	published_at: string | null;
}

export interface CreatePostDto {
	slug: string;
	title: string;
	author_id: number;
	hero_id?: string;
	text_json?: string;
	text: string;
	published_at?: Date;
}

export async function getPosts(): Promise<PostResponse[]> {
	const url = new URL('/v1/posts', baseUrl);
	const response = await fetch(url, {
		headers: {
			Accept: 'application/json',
		},
	});

	if (response.ok) {
		return (await response.json()) as PostResponse[];
	}

	throw new Error('Something went wrong with the posts request');
}

export async function createPost(createPostDto: CreatePostDto) {
	const url = new URL('/v1/posts', baseUrl);
	const response = await fetch(url, {
		method: 'post',
		body: JSON.stringify(createPostDto),
		headers: {
			Accept: 'application/json',
		},
	});

	if (response.ok) {
		return (await response.json()) as PostResponse;
	}

	throw new Error('Something went wrong with the create post request');
}
