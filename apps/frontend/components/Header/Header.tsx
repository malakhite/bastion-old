import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from './Header.module.scss';

interface HeaderProps {}

const menuLinks = [
	{
		label: 'About me',
		href: '/about',
	},
	{
		label: 'Blog',
		href: '/posts',
	},
	{
		label: 'Projects',
		href: '/projects',
	},
];

export default function Header({}: HeaderProps) {
	const router = useRouter();
	const [activeLink, setActiveLink] = useState(router.pathname);

	useEffect(() => {
		setActiveLink(router.pathname);
	}, [router.pathname]);

	return (
		<header className={styles.header}>
			<div>
				<h1 className={styles.logo}>Scott Abbey</h1>
			</div>
			<div className={styles.linkContainer}>
				{menuLinks.map((link) => (
					<Link href={link.href} key={link.href}>
						<a
							className={`${styles.link} ${
								activeLink.startsWith(link.href) &&
								styles.linkActive
							}`}
						>
							{link.label}
						</a>
					</Link>
				))}
			</div>
		</header>
	);
}
