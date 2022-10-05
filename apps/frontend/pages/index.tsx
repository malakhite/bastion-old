import { Container } from '@mantine/core';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import BlogCardContainer from '../components/BlogCardContainer';
import Hero from '../components/Hero';
import { getPosts } from '../lib/api/posts';

export function Index() {
	const { data: blogEntries } = useQuery(['posts'], getPosts);

	return (
		<>
			<Hero />
			<Container>
				{blogEntries && (
					<BlogCardContainer posts={blogEntries.slice(0, 4)} />
				)}
			</Container>
		</>
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

export default Index;
