import styles from './Hamburger.module.scss';
import type { ReactEventHandler } from 'react';

interface HamburgerMenuProps {
	active: boolean;
	onClick: ReactEventHandler<HTMLButtonElement>;
}

export default function HamburgerMenu({ active, onClick }: HamburgerMenuProps) {
	return (
		<button
			className={styles.container}
			onClick={onClick}
			data-active={active}
		>
			<div className={styles.top}></div>
			<div className={styles.middle}></div>
			<div className={styles.bottom}></div>
		</button>
	);
}
