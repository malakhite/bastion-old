import { Card, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

// import Link from '../components/Link';

type Post = {
	id: string;
	slug: string;
	title: string;
	content: string;
	published_at: Date;
	hero: {
		url: string;
		alt: string;
		height: number;
		width: number;
	};
	author: {
		id: string;
		name: string;
		email: string;
	};
};

const posts: Post[] = [];

posts.sort((a, b) => a.published_at.valueOf() - b.published_at.valueOf());

export function Index() {
	return (
		<div style={{ display: 'flex' }}>
			{posts.slice(0, 3).map((post) => (
				<div
					key={post.id}
					style={{ height: 400, width: 300, margin: 'auto' }}
				>
					<Card>
						<Card.Section>
							<Image
								src={post.hero.url}
								alt={post.hero.alt}
								height={post.hero.height}
								width={post.hero.width}
							/>
						</Card.Section>
						<Title order={3}>
							<Link href={`/posts/${post.slug}`} passHref>
								<Text
									component="a"
									lineClamp={1}
									variant="link"
								>
									{post.title}
								</Text>
							</Link>
						</Title>
						<Link href={`/posts/author/${post.author.id}`} passHref>
							<Text component="a" size="sm" variant="link">
								{post.author.name}
							</Text>
						</Link>
						<Text lineClamp={3}>{`${post.content}...`}</Text>
					</Card>
				</div>
			))}
		</div>
	);
}

export default Index;
