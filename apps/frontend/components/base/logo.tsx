import { createStyles, Title } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
	logo: {
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
	},
}));

export default function Logo() {
	const { classes } = useStyles();
	return (
		<Link href="/">
			<a className={classes.logo}>
				<Title order={1}>Scott Abbey</Title>
			</a>
		</Link>
	);
}
