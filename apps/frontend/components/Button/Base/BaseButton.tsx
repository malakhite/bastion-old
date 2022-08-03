import type { ReactEventHandler, ReactNode } from 'react';

import styles from './BaseButton.module.scss';

interface BaseButtonProps {
	children: ReactNode;
	onClick?: ReactEventHandler<HTMLButtonElement>;
	component: 'a' | 'button';
	type: 'button' | 'submit' | 'reset';
	variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
}

/**
 * A BaseButton that can be used to create more complicated Buttons
 */
export default function BaseButton({
	children,
	onClick,
	component = 'button',
	type = 'submit',
	variant = 'primary',
}: BaseButtonProps) {
	const style = `${styles.button} ${styles[variant]}`;

	if (component === 'a') {
		return (
			<a className={style} aria-role="button">
				{children}
			</a>
		);
	}

	return (
		<button onClick={onClick} type={type} className={style}>
			{children}
		</button>
	);
}
