import type { ReactNode } from 'react';
import Header from '../Header/Header';

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
