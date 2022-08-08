import Image from 'next/image';
import Link from 'next/link';
import LinesEllipsis from 'react-lines-ellipsis';

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
	post: Post;
}

export function Card({ post }: CardProps) {
	return (
		<Link href={`/posts/${post.slug}`}>
			<a className={styles.card}>
				<div className={styles.imgContainer}>
					<Image
						src={post.hero.src}
						layout="fill"
						objectFit="cover"
						alt={post.hero.alt}
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
