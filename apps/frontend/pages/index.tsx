import { Container, createStyles, Grid, Paper } from '@mantine/core';
import ArticleCard from '../components/card';
import Hero from '../components/home/hero';
import SectionHeading from '../components/section-heading';

const mockPosts = [
	{
		image: {
			src: 'https://i.imgur.com/Cij5vdL.png',
			alt: 'Test image',
		},
		link: 'https://mantine.dev/',
		title: 'Resident Evil Village review',
		description:
			'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
		author: {
			name: 'Bill Wormeater',
			image: 'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		},
	},
	{
		image: {
			src: 'https://i.imgur.com/Cij5vdL.png',
			alt: 'Test image',
		},
		link: 'https://mantine.dev/',
		title: 'Resident Evil Village review',
		description:
			'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
		author: {
			name: 'Bill Wormeater',
			image: 'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		},
	},
	{
		image: {
			src: 'https://i.imgur.com/Cij5vdL.png',
			alt: 'Test image',
		},
		link: 'https://mantine.dev/',
		title: 'Resident Evil Village review',
		description:
			'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
		author: {
			name: 'Bill Wormeater',
			image: 'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		},
	},
	{
		image: {
			src: 'https://i.imgur.com/Cij5vdL.png',
			alt: 'Test image',
		},
		link: 'https://mantine.dev/',
		title: 'Resident Evil Village review',
		description:
			'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
		author: {
			name: 'Bill Wormeater',
			image: 'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		},
	},
	{
		image: {
			src: 'https://i.imgur.com/Cij5vdL.png',
			alt: 'Test image',
		},
		link: 'https://mantine.dev/',
		title: 'Resident Evil Village review',
		description:
			'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
		author: {
			name: 'Bill Wormeater',
			image: 'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		},
	},
	{
		image: {
			src: 'https://i.imgur.com/Cij5vdL.png',
			alt: 'Test image',
		},
		link: 'https://mantine.dev/',
		title: 'Resident Evil Village review',
		description:
			'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
		author: {
			name: 'Bill Wormeater',
			image: 'https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
		},
	},
];

const useStyles = createStyles(() => ({
	sectionContainer: {
		marginTop: '40px',
	},
}));

export default function Home() {
	const { classes } = useStyles();

	return (
		<>
			<Hero />
			<Container>
				<Paper className={classes.sectionContainer} component="section">
					<SectionHeading>Blog posts</SectionHeading>
					<Grid grow>
						{mockPosts.slice(0, 3).map((post, index) => (
							<Grid.Col span={4} key={`post-${index}`}>
								<ArticleCard {...post} />
							</Grid.Col>
						))}
					</Grid>
				</Paper>
			</Container>
		</>
	);
}
