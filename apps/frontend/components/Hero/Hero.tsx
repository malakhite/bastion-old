import Image from 'next/image';
import styles from './Hero.module.scss';
import heroImage from '../../public/mcafee_knob.jpg';

export function Hero() {
	return (
		<div className={styles.container}>
			<div className={styles.hero}>
				<Image
					src={heroImage}
					alt="McAfee Knob"
					layout="fill"
					objectFit="cover"
					className={styles.heroImage}
				/>
			</div>
			<div className={styles.heroText}>
				<h2>Hi! I&apos;m Scott.</h2>
				<p>
					I&apos;m a software engineer from Virginia Beach, VA with a
					passion for automation, tooling, and managing complexity.
				</p>
			</div>
		</div>
	);
}
