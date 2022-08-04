import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';

import '../styles/index.scss';

export default function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>scottabbey.com</title>
			</Head>
			<Layout>
				<main className="app">
					<Component {...pageProps} />
				</main>
			</Layout>
		</>
	);
}
