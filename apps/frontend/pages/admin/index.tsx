import { Container, Title } from '@mantine/core';
import Head from 'next/head';
import ProtectedWrapper from '../../components/Protected/Protected';

export default function Admin() {
	return (
		<ProtectedWrapper>
			<Head>
				<title>Admin | scottabbey.com</title>
			</Head>
			<Container>
				<Title order={1}>Administration</Title>
			</Container>
		</ProtectedWrapper>
	);
}
