import { Container, Title } from '@mantine/core';
import Head from 'next/head';
import ProtectedWrapper from '../components/Protected/Protected';
import { useAuth } from '../lib/hooks/useAuth';
import UserForm from '../components/UserForm';

export default function Me() {
	const { updateSelfMutation, user } = useAuth();

	return (
		<ProtectedWrapper>
			<Head>
				<title>Me | scottabbey.com</title>
			</Head>

			<Container>
				<Title order={1}>Me</Title>
				<UserForm user={user} updateUser={updateSelfMutation.mutate} />
			</Container>
		</ProtectedWrapper>
	);
}
