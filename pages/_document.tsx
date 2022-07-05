import createEmotionServer from '@emotion/server/create-instance';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { createEmotionCache } from '../lib/emotion';
import { light } from '../lib/theme';
export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content={light.palette.primary.main} />
					<link rel="shortcut icon" href="/static/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async function (ctx) {
	const originalRenderPage = ctx.renderPage;

	const cache = createEmotionCache();
	const emotionServer = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			enhanceApp: (App: any) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				},
		});

	const initialProps = await Document.getInitialProps(ctx);
	const emotionStyles = emotionServer.extractCriticalToChunks(
		initialProps.html,
	);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return { ...initialProps, emotionStyleTags };
};
