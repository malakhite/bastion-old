import { createStyles, Title } from '@mantine/core';
import type { TitleOrder } from '@mantine/core';
import type { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
	title: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: '20px',
		textAlign: 'left',
		marginBottom: '20px',

		'&::after': {
			content: '""',
			flexGrow: 1,
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.white
					: theme.colors.dark[7],
			height: '2px',
			margin: 'auto',
		},
	},
}));

interface SectionHeadingProps {
	children: ReactNode;
	titleOrder?: TitleOrder;
}

export default function SectionHeading({
	children,
	titleOrder = 3,
}: SectionHeadingProps) {
	const { classes } = useStyles();

	return (
		<Title order={titleOrder} className={classes.title}>
			{children}
		</Title>
	);
}
