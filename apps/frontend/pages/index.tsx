import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { Card } from '../components/Card';
import { CardContainer } from '../components/CardContainer';
import { Hero } from '../components/Hero';
import { getPosts } from '../lib/api/posts';

import styles from './index.module.scss';

export function Index() {
	const { data: blogEntries } = useQuery(['posts'], getPosts);

	return (
		<div>
			<Hero />
			<div className={styles.body}>
				{blogEntries && (
					<section className={styles.postsSection}>
						<CardContainer>
							{blogEntries.slice(0, 4).map((entry) => (
								<Card post={entry} key={entry.id} />
							))}
						</CardContainer>
					</section>
				)}
			</div>
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

export default Index;
