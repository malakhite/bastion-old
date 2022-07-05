import { Container } from '@mui/material';
import type { FunctionComponent, ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = function ({ children }) {
	return <Container maxWidth="lg">{children}</Container>;
};

export default Layout;
