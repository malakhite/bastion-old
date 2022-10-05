import Head from 'next/head';
import ProtectedWrapper from '../../components/Protected/Protected';
import { useUser } from '../../lib/hooks/useUser';
import UserForm from '../../components/UserForm';

export default function Me() {
	const { user } = useUser();

	return (
		<ProtectedWrapper>
			<Head>
				<title>Me | scottabbey.com</title>
			</Head>

			<div>
				<h1>Me</h1>
				<UserForm user={user} />
			</div>
		</ProtectedWrapper>
	);
}
