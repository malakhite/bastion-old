import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HamburgerMenu } from '../Button/Hamburger';

import type { ReactEventHandler } from 'react';

import styles from './Header.module.scss';
import { Profile } from './Profile';

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

export function Header() {
	const router = useRouter();
	const [activeLink, setActiveLink] = useState(router.pathname);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleHamburgerClick: ReactEventHandler<HTMLButtonElement> = (
		event,
	) => {
		setMenuOpen(!menuOpen);
	};

	useEffect(() => {
		setActiveLink(router.pathname);
	}, [router.pathname]);

	return (
		<header className={styles.header}>
			<div>
				{router.pathname === '/' ? (
					<h2 className={styles.logo}>Scott Abbey</h2>
				) : (
					<Link href="/">
						<a>
							<h2 className={styles.logo}>Scott Abbey</h2>
						</a>
					</Link>
				)}
			</div>
			<HamburgerMenu active={menuOpen} onClick={handleHamburgerClick} />
			<div className={styles.linkContainer} data-active={menuOpen}>
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
				<Profile />
			</div>
		</header>
	);
}
