import { Head, Html, Main, NextScript } from 'next/document';
import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Noto+Sans+Mono&family=Noto+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

Document.getInitialProps = getInitialProps;

export default Document;
