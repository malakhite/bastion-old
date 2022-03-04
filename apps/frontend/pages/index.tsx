import faker from '@faker-js/faker';
import { Card, Text } from '@mantine/core';
import Image from 'next/image';

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

for (let i = 0; i < 20; i++) {
	posts.push({
		id: faker.datatype.uuid(),
		slug: faker.lorem.slug(),
		title: faker.lorem.words(),
		content: faker.lorem.paragraphs(4),
		published_at: faker.date.past(),
		hero: {
			url: 'https://picsum.photos/300/200',
			alt: faker.lorem.sentence(),
			height: 200,
			width: 300,
		},
		author: {
			id: faker.datatype.uuid(),
			name: faker.name.findName(),
			email: faker.internet.email(),
		},
	});
}

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
						<Text>{`${post.content.slice(0, 100)}...`}</Text>
					</Card>
				</div>
			))}
		</div>
	);
}

export default Index;
