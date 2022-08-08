import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { Layout } from '../components/Layout';

import '../styles/index.scss';

export default function CustomApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Head>
					<title>scottabbey.com</title>
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Hydrate>
		</QueryClientProvider>
	);
}
