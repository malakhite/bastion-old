import { AppShell, createStyles, Group, Header } from '@mantine/core';
import Link from 'next/link';
import Logo from './logo';

import type { ReactNode } from 'react';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},

		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md,
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).color,
		},
	},
}));

const links = [
	{
		href: '/about',
		label: 'About Me',
	},
	{
		href: '/blog',
		label: 'Blog',
	},
	{
		href: '/projects',
		label: 'Projects',
	},
];

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const { classes, cx } = useStyles();
	const router = useRouter();

	const linkItems = links.map((link) => (
		<Link key={link.label} href={link.href}>
			<a
				className={cx(classes.link, {
					[classes.linkActive]: router.pathname.startsWith(link.href),
				})}
			>
				{link.label}
			</a>
		</Link>
	));

	return (
		<AppShell
			padding={0}
			header={
				<Header
					height={60}
					px="md"
					mb={120}
					fixed
					zIndex={1}
					className={classes.header}
				>
					<Logo />
					<Group spacing={5} className={classes.links}>
						{linkItems}
					</Group>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}
