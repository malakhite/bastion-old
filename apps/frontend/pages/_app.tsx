import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import Layout from '../components/Layout/Layout';
// import '../styles/index.scss';

export default function CustomApp({ Component, pageProps }: AppProps) {
	const userColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(userColorScheme);

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	return (
		<>
			<Head>
				<title>Welcome to frontend!</title>
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
