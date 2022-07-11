import { Container } from '@mui/material';
import type { FunctionComponent, ReactNode } from 'react';
import Copyright from './copyright';

interface LayoutProps {
	children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = function ({ children }) {
	return (
		<Container maxWidth="lg">
			{children}
			<Copyright />
		</Container>
	);
};

export default Layout;
