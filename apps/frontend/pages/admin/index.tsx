import { Title } from '@mantine/core';
import { useUser } from '../../lib/hooks';

export function AdminIndex() {
	const user = useUser({ redirectTo: '/login' });

	return (
		<div>
			<Title order={2}>Administration</Title>
			{user && <Title order={3}>Welcome {user.name}</Title>}
		</div>
	);
}

export default AdminIndex;
