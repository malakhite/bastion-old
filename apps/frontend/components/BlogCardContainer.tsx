import { Center, Grid, Title } from '@mantine/core';
import { PostResponse } from '../lib/api/posts';
import BlogCard from './BlogCard';

interface BlogCardContainerProps {
	posts: PostResponse[];
}

export default function BlogCardContainer({ posts }: BlogCardContainerProps) {
	return (
		<section>
			<Title order={3} py="sm">
				Recent Blog Posts
			</Title>
			<Center>
				<Grid grow>
					{posts.map((post) => (
						<Grid.Col span={4} key={post.slug}>
							<BlogCard post={post} />
						</Grid.Col>
					))}
				</Grid>
			</Center>
		</section>
	);
}
