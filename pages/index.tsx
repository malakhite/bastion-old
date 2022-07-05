import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import Layout from '../components/layout';
import { TITLE } from '../lib/constants';
import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
	return (
		<div>
			<Head>
				<title>{TITLE}</title>
			</Head>
			<Box
				sx={{
					my: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant="h4" component="h1" gutterBottom>
					Scott Abbey
				</Typography>
			</Box>

			<footer></footer>
		</div>
	);
};

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Home;
