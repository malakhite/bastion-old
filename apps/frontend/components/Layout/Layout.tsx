import { useRouter } from 'next/router';

import { Header } from '../Header';

import type { ReactNode } from 'react';

import styles from './Layout.module.scss';

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	const router = useRouter();
	if (router.pathname === '/') {
		return (
			<>
				<Header />
				{children}
			</>
		);
	}

	return (
		<>
			<Header />
			<main className={styles.app}>{children}</main>
		</>
	);
}
