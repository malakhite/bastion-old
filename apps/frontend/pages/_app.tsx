import { AppProps } from 'next/app';
import Head from 'next/head';
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from '@mantine/core';
import { useColorScheme, useLocalStorageValue } from '@mantine/hooks';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Layout from '../components/Layout/Layout';

config.autoAddCss = false;

export default function CustomApp({ Component, pageProps }: AppProps) {
	const userColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
		key: 'color-scheme',
		defaultValue: userColorScheme,
	});

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<>
			<Head>
				<title>scottabbey.com</title>
			</Head>
			<main className="app">
				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}
				>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							colorScheme,
							fontFamily: '"Noto Sans", sans-serif',
							fontFamilyMonospace: '"Noto Sans Mono", monospace',
							headings: {
								fontFamily: '"Noto Serif Display", serif',
							},
						}}
					>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</MantineProvider>
				</ColorSchemeProvider>
			</main>
		</>
	);
}
