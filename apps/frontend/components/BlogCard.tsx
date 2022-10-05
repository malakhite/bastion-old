import {
	Button,
	Card,
	Text,
	Title,
	TypographyStylesProvider,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { PostResponse } from '../lib/api/posts';

import heroImage from '../public/mcafee_knob.jpg';

interface BlogCardProps {
	post: PostResponse;
}

export default function BlogCard({ post }: BlogCardProps) {
	const image = post.hero ?? {
		file_name: heroImage,
		alt_text: "McAfee's Knob",
	};
	return (
		<Card component="article">
			<Card.Section sx={{ height: 200, position: 'relative' }}>
				<Image
					src={image.file_name}
					layout="fill"
					objectFit="cover"
					alt={image.alt_text}
				/>
			</Card.Section>
			<Card.Section inheritPadding sx={{ height: 120, paddingTop: 10 }}>
				<Title order={4} lineClamp={1}>
					{post.title}
				</Title>
				<TypographyStylesProvider>
					<Text size="sm" color="dimmed" lineClamp={3}>
						<div
							dangerouslySetInnerHTML={{
								__html: post.text,
							}}
						/>
					</Text>
				</TypographyStylesProvider>
			</Card.Section>
			<Link href={`/posts/${post.slug}`}>
				<Button variant="light" fullWidth component="a">
					Read post
				</Button>
			</Link>
		</Card>
	);
}
