import { AppShell, Button, Group, Header, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import UserMenu from './UserMenu';

interface MenuLinkProps {
	href: string;
	label: string;
}

function MenuLink({ href, label }: MenuLinkProps) {
	return (
		<Button
			component={NextLink}
			href={href}
			sx={(theme) => ({
				a: {
					':hover': {
						color: theme.fn.primaryColor()[9],
					},
				},
			})}
		>
			{label}
		</Button>
	);
}

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const router = useRouter();

	return (
		<AppShell
			padding={router.pathname === '/' ? 0 : 'sm'}
			header={
				<Header
					height={60}
					px="sm"
					py="xs"
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					{router.pathname === '/' ? (
						<Title order={1} sx={{ fontSize: '32px' }}>
							Scott Abbey
						</Title>
					) : (
						<Link href="/">
							<a style={{ textDecoration: 'none' }}>
								<Title
									order={2}
									sx={(theme) => ({
										color: theme.colors.dark[0],
										fontSize: '32px',
									})}
								>
									Scott Abbey
								</Title>
							</a>
						</Link>
					)}
					<Group>
						<MenuLink href="/about" label="About" />
						<MenuLink href="/posts" label="Posts" />
						<MenuLink href="/projects" label="Projects" />
						<UserMenu />
					</Group>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}
