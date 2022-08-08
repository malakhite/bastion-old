import styles from './CardContainer.module.scss';

import type { ReactNode } from 'react';

export interface CardContainerProps {
	children: ReactNode;
}

export function CardContainer({ children }: CardContainerProps) {
	return (
		<div className={styles.section}>
			<h3>Recent Posts</h3>
			<div className={styles.cardContainer}>{children}</div>
		</div>
	);
}
