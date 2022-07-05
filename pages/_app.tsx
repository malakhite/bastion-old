import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { createEmotionCache } from '../lib/emotion';
import { light } from '../lib/theme';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import type { ReactElement, ReactNode } from 'react';

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsWithLayout extends AppProps {
	Component: NextPageWithLayout;
	emotionCache?: EmotionCache;
	pageProps: {
		session: Session;
		[prop: string]: unknown;
	};
}

function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return getLayout(
		<SessionProvider session={session}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta
						name="viewport"
						content="intitial-scale=1, width=device-width"
					/>
				</Head>
				<ThemeProvider theme={light}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		</SessionProvider>,
	);
}

export default App;
