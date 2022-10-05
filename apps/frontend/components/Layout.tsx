import { AppShell, Button, Group, Header, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import UserMenu from './UserMenu';

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
						<Button component={NextLink} href="/about">
							About
						</Button>
						<Button component={NextLink} href="/posts">
							Blog
						</Button>
						<Button component={NextLink} href="/projects">
							Projects
						</Button>

						<UserMenu />
					</Group>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}
