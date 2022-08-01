import { Container, createStyles, Overlay, Text, Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	hero: {
		position: 'relative',
		backgroundImage:
			'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},

	container: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		// paddingBottom: theme.spacing.xl * 10,
		zIndex: 1,
		position: 'relative',

		[theme.fn.smallerThan('sm')]: {
			height: 500,
			// paddingBottom: theme.spacing.xl * 3,
		},
	},

	title: {
		color: theme.white,
		fontSize: 60,
		fontWeight: 900,
		lineHeight: 1.1,

		[theme.fn.smallerThan('sm')]: {
			fontSize: 40,
			lineHeight: 1.3,
		},
	},

	description: {
		color: theme.white,
		fontSize: theme.fontSizes.xl,
		marginTop: theme.spacing.xl,
		maxWidth: 600,

		[theme.fn.smallerThan('sm')]: {
			maxWidth: '100%',
			fontSize: theme.fontSizes.sm,
		},
	},
}));

export default function Hero() {
	const { classes } = useStyles();

	return (
		<section className={classes.hero}>
			<Overlay
				gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
				opacity={1}
				zIndex={0}
			/>
			<Container className={classes.container}>
				<Title order={2} className={classes.title}>
					Hi, I&apos;m Scott.
				</Title>
				<Text className={classes.description}>
					I&apos;m a software engineer with a strong interest in all
					things to do with creating software for the networked world.
				</Text>
			</Container>
		</section>
	);
}
