import Image from 'next/image';
import Link from 'next/link';
import LinesEllipsis from 'react-lines-ellipsis';
import type { PostResponse } from '../../lib/api/posts';

import heroImage from '../../public/mcafee_knob.jpg';

import styles from './Card.module.scss';

export interface Post {
	id: number;
	slug: string;
	title: string;
	hero: {
		src: string;
		alt: string;
	};
	author: {
		email: string;
		name: string;
	};
	published_at: Date;
	updated_at: Date;
	text: string;
	categories: Array<string>;
}

export interface CardProps {
	post: PostResponse;
}

export function Card({ post }: CardProps) {
	const image = post.hero ?? {
		file_name: heroImage,
		alt_text: "McAfee's Knob",
	};
	return (
		<Link href={`/posts/${post.slug}`}>
			<a className={styles.card}>
				<div className={styles.imgContainer}>
					<Image
						src={image.file_name}
						layout="fill"
						objectFit="cover"
						alt={image.alt_text}
					/>
				</div>
				<div className={styles.content}>
					<h4 className={styles.title}>{post.title}</h4>
					<div className={styles.textContainer}>
						<LinesEllipsis text={post.text} maxLine="7" />
					</div>
					<div className={styles.author}>{post.author.name}</div>
				</div>
			</a>
		</Link>
	);
}
