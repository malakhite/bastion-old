/* eslint-disable no-fallthrough */
import { ReactNode } from 'react';
import { Role } from '../../lib/api/users';
import { useUser } from '../../lib/hooks/useUser';

interface ProtectedWrapperProps {
	minRole?: Role;
	children: ReactNode;
}

export default function ProtectedWrapper({
	minRole = Role.OWNER,
	children,
}: ProtectedWrapperProps) {
	const { user } = useUser();

	let rolePasses = false;

	switch (minRole) {
		case Role.GUEST: {
			if (user?.role === Role.GUEST) {
				rolePasses = true;
			}
		}
		case Role.USER: {
			if (user?.role === Role.USER) {
				rolePasses = true;
			}
		}
		case Role.ADMIN: {
			if (user?.role === Role.ADMIN) {
				rolePasses = true;
			}
		}
		case Role.OWNER: {
			if (user?.role === Role.OWNER) {
				rolePasses = true;
			}
		}
	}

	if (user && rolePasses) {
		return <>{children}</>;
	}

	return (
		<div className="">You do not have permission to view this page.</div>
	);
}
