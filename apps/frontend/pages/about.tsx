import Head from 'next/head';

import styles from './about.module.scss';

export default function About() {
	return (
		<>
			<Head>
				<title>About me | scottabbey.com</title>
			</Head>
			<section className={styles.body}>
				<h1>About me</h1>
				<p>
					I&apos;m a developer from Virginia Beach, VA. Software is
					actually my second career. Before becoming a developer I was
					a paramedic and firefighter for nearly 20 years. I enjoyed
					the work, but the hours were awful and the pay was miserly.
					I was lucky enough to have made connections in the software
					industry and got offered an entry-level position out of the
					blue. While things haven&apos;t always been sunshine and
					rainbows since then, I&apos;m in a much better place now
					than at any other point in my life, and can&apos;t imagine
					going back to my other life.
				</p>
			</section>
		</>
	);
}
