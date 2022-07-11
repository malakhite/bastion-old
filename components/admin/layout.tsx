import { Container, Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import Copyright from '../copyright';

interface AdminLayoutProps {
	children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
	const { data: session, status } = useSession();

	if (!session && status === 'loading') {
		return <Skeleton variant="rectangular" />;
	}

	return (
		<Container maxWidth="lg">
			{children}
			<Copyright />
		</Container>
	);
}

export default AdminLayout;
