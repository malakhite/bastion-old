/* eslint-disable no-fallthrough */
import { Center, Loader, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { Role } from '../../lib/api/users';
import { useAuth } from '../../lib/hooks/useAuth';

interface ProtectedWrapperProps {
	minRole?: Role;
	children: ReactNode;
}

export default function ProtectedWrapper({
	minRole = Role.OWNER,
	children,
}: ProtectedWrapperProps) {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const [rolePasses, setRolePasses] = useState(false);
	const [timer, setTimer] = useState(5);

	useEffect(() => {
		switch (minRole) {
			case Role.GUEST: {
				if (user?.role === Role.GUEST) {
					setRolePasses(true);
				}
			}
			case Role.USER: {
				if (user?.role === Role.USER) {
					setRolePasses(true);
				}
			}
			case Role.ADMIN: {
				if (user?.role === Role.ADMIN) {
					setRolePasses(true);
				}
			}
			case Role.OWNER: {
				if (user?.role === Role.OWNER) {
					setRolePasses(true);
				}
			}
		}
	}, [minRole, user?.role]);

	useEffect(() => {
		if (!rolePasses) {
			if (timer > 0) {
				const countdown = setInterval(() => setTimer(timer - 1), 1000);

				return () => clearInterval(countdown);
			} else {
				router.push('/');
			}
		}
	}, [rolePasses, router, timer]);

	if (isLoading) {
		return <Loader />;
	}

	if (user && rolePasses) {
		return <>{children}</>;
	}

	return (
		<Paper p="md">
			<Center>
				<Text>
					You do not have permission to view this page. You will be
					redirected to the{' '}
					<Link href="/" passHref>
						<Text variant="link" component="a">
							home page
						</Text>
					</Link>{' '}
					in <b>{timer}</b> seconds.
				</Text>
			</Center>
		</Paper>
	);
}
