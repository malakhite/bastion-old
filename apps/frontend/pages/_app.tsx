import { useState } from 'react';
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import Head from 'next/head';
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '../components/Layout';
import { ModalName } from '../lib/constants';
import { LoginModal } from '../components/Modals/Login';

export default function CustomApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						cacheTime: 1000 * 60 * 60 * 24, // 24 hours
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Head>
					<title>scottabbey.com</title>
				</Head>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: 'dark',
						fontFamily: '"Noto Sans", sans-serif',
						fontFamilyMonospace: '"Noto Sans Mono", monospace',
						headings: {
							fontFamily: '"Noto Sans Display", sans-serif',
						},
						primaryColor: 'violet',
						globalStyles: (theme) => ({}),
					}}
				>
					<ModalsProvider modals={{ [ModalName.Login]: LoginModal }}>
						<NotificationsProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</NotificationsProvider>
					</ModalsProvider>
				</MantineProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
