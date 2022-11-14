import { Container, Paper, Text, Title } from '@mantine/core';
import Image from 'next/image';
import useStyles from './Hero.styles';
import heroImage from '../public/mcafee_knob.jpg';

export default function Hero() {
	const { classes } = useStyles();
	return (
		<Container
			sx={{
				height: 'calc(100vh - 60px)',
				margin: 0,
				maxWidth: '100vw',
				padding: 0,
				position: 'relative',
				width: '100vw',
			}}
		>
			<Image
				src={heroImage}
				alt="McAfee Knob"
				layout="fill"
				objectFit="cover"
				className={classes.hero}
			/>
			<Paper p="md" radius="lg" shadow="md" className={classes.heroText}>
				<Title order={1}>Hi! I&apos;m Scott.</Title>
				<Text>
					I&apos;m a software engineer from Virginia with a passion
					for automation, tooling, and managing complexity.
				</Text>
			</Paper>
		</Container>
	);
}
