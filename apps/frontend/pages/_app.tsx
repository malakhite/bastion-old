import { AppProps } from 'next/app';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export default function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>scottabbey.com</title>
			</Head>
			<main className="app">
				<Component {...pageProps} />
			</main>
		</>
	);
}
