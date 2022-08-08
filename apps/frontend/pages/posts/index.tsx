import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getPosts } from '../../lib/api/posts';

import type { GetServerSideProps } from 'next';

export default function Posts() {
	const { data } = useQuery(['posts'], getPosts);
	return (
		<div>
			{data.map((post) => (
				<div key={post.slug}>
					<h3>{post.title}</h3>
					<div>{post.text}</div>
				</div>
			))}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps =
	async function getServerSideProps(context) {
		const queryClient = new QueryClient();

		await queryClient.prefetchQuery(['posts'], getPosts);

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
			},
		};
	};
