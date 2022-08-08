import { Card, Post } from '../components/Card';
import { CardContainer } from '../components/CardContainer';
import { Hero } from '../components/Hero';

import styles from './index.module.scss';

const blogEntries: Post[] = [
	{
		id: 5,
		slug: 'test-post-5',
		title: 'Test Post 5',
		hero: {
			src: 'https://images.unsplash.com/photo-1659478729163-29c42f84d929',
			alt: 'Some alt text',
		},
		author: {
			email: 'jane.roe@mailinator.com',
			name: 'Jane Roe',
		},
		published_at: new Date('2022-08-05T00:00:00'),
		updated_at: new Date('2022-08-05T00:00:00'),
		text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque eligendi, voluptatibus error provident dolore architecto porro tempore rem molestiae saepe labore nesciunt expedita eum blanditiis voluptate, animi est perspiciatis facere. Aspernatur, nisi, delectus laborum beatae ea veniam autem totam at provident vitae porro impedit incidunt. Corporis autem earum necessitatibus sapiente voluptate officiis, molestiae quidem itaque, hic veniam excepturi assumenda fuga.',
		categories: ['test', 'foo', 'bar'],
	},
	{
		id: 4,
		slug: 'test-post-4',
		title: 'Test Post 4',
		hero: {
			src: 'https://images.unsplash.com/photo-1659430059583-0bb97b6aa8c4',
			alt: 'Some alt text',
		},
		author: {
			email: 'jane.roe@mailinator.com',
			name: 'Jane Roe',
		},
		published_at: new Date('2022-08-04T00:00:00'),
		updated_at: new Date('2022-08-04T00:00:00'),
		text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam laudantium unde nesciunt incidunt laboriosam tenetur tempora sit dignissimos neque! Laudantium nihil non consequuntur, eaque nemo velit asperiores eligendi placeat aspernatur?',
		categories: ['test', 'foo', 'baz'],
	},
	{
		id: 3,
		slug: 'test-post-3',
		title: 'Test Post 3',
		hero: {
			src: 'https://images.unsplash.com/photo-1657616696356-c197dfd0c14f',
			alt: 'Some alt text',
		},
		author: {
			email: 'jane.roe@mailinator.com',
			name: 'Jane Roe',
		},
		published_at: new Date('2022-08-03T00:00:00'),
		updated_at: new Date('2022-08-03T00:00:00'),
		text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque eligendi, voluptatibus error provident dolore architecto porro tempore rem molestiae saepe labore nesciunt expedita eum blanditiis voluptate, animi est perspiciatis facere. Aspernatur, nisi, delectus laborum beatae ea veniam autem totam at provident vitae porro impedit incidunt. Corporis autem earum necessitatibus sapiente voluptate officiis, molestiae quidem itaque, hic veniam excepturi assumenda fuga.',
		categories: ['test', 'baz', 'bar'],
	},
	{
		id: 2,
		slug: 'test-post-2',
		title: 'Test Post 2',
		hero: {
			src: 'https://images.unsplash.com/photo-1659636688047-65f34ef54da7',
			alt: 'Some alt text',
		},
		author: {
			email: 'jane.roe@mailinator.com',
			name: 'Jane Roe',
		},
		published_at: new Date('2022-08-02T00:00:00'),
		updated_at: new Date('2022-08-02T00:00:00'),
		text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam laudantium unde nesciunt incidunt laboriosam tenetur tempora sit dignissimos neque! Laudantium nihil non consequuntur, eaque nemo velit asperiores eligendi placeat aspernatur?',
		categories: ['baz', 'foo', 'bar'],
	},
	{
		id: 1,
		slug: 'test-post-1',
		title: 'Test Post 1',
		hero: {
			src: 'https://images.unsplash.com/photo-1508600991832-398e1c10fa51',
			alt: 'Some alt text',
		},
		author: {
			email: 'jane.roe@mailinator.com',
			name: 'Jane Roe',
		},
		published_at: new Date('2022-08-01T00:00:00'),
		updated_at: new Date('2022-08-01T00:00:00'),
		text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam laudantium unde nesciunt incidunt laboriosam tenetur tempora sit dignissimos neque! Laudantium nihil non consequuntur, eaque nemo velit asperiores eligendi placeat aspernatur?',
		categories: ['test', 'foo', 'bar'],
	},
];

export function Index() {
	return (
		<div>
			<Hero />
			<div className={styles.body}>
				<section className={styles.postsSection}>
					<CardContainer>
						{blogEntries.slice(0, 4).map((entry) => (
							<Card post={entry} key={entry.id} />
						))}
					</CardContainer>
				</section>
			</div>
		</div>
	);
}

export default Index;
