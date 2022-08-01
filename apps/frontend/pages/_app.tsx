import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import Layout from '../components/base/layout';
import { BASE_TITLE } from '../constants';

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	return Component.getLayout ? (
		Component.getLayout(
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ colorScheme: 'light' }}
			>
				<Component {...pageProps} />
			</MantineProvider>,
		)
	) : (
		<>
			<Head>
				<title>{BASE_TITLE}</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ colorScheme: 'light' }}
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</>
	);
}

export default MyApp;
