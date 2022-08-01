import { createStyles, Stack, Title } from '@mantine/core';

const useStyles = createStyles({
	intro: {
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		width: '100vw',
		color: 'white',
	},
});

export default function Intro() {
	const { classes } = useStyles();
	return (
		<Stack className={classes.intro}>
			<Title order={2}>Scott Abbey</Title>
			<Title order={3}>Software Engineer</Title>
		</Stack>
	);
}
