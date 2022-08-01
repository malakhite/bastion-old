import {
	ActionIcon,
	Alert,
	Badge,
	Center,
	Container,
	Group,
	Loader,
	Table,
	Text,
} from '@mantine/core';
import { Pencil, Trash } from 'tabler-icons-react';
import { useUserList } from '../../../hooks/users';
import Link from 'next/link';

export default function UsersAdmin() {
	const { users, isLoading, isError } = useUserList();

	if (isLoading) return <Loader variant="bars" />;
	if (isError)
		return (
			<Alert title="Uh oh!" color="red">
				Something went wrong! This error has been logged and we&apos;ll
				be fixing it soon!
			</Alert>
		);

	const rows = users?.map((user) => {
		return (
			<tr key={user.id}>
				<td>
					<Text>{user.email}</Text>
				</td>
				<td>
					<Text>{user.name}</Text>
				</td>
				<td>
					{user.is_admin ? (
						<Badge color="violet" fullWidth>
							Admin
						</Badge>
					) : (
						<Badge fullWidth>User</Badge>
					)}
				</td>
				<td>
					{user.is_active ? (
						<Badge fullWidth>Active</Badge>
					) : (
						<Badge color="gray" fullWidth>
							Inactive
						</Badge>
					)}
				</td>
				<td>{new Date(user.created_at).toLocaleString()}</td>
				<td>{new Date(user.updated_at).toLocaleString()}</td>
				<td>
					<Group spacing={0} position="right">
						<Link
							href={{
								pathname: '/admin/users/[id]/edit',
								query: { id: user.id },
							}}
							passHref
						>
							<ActionIcon aria-label="edit user" component="a">
								<Pencil size={16} />
							</ActionIcon>
						</Link>
						<ActionIcon aria-label="delete user">
							<Trash size={16} />
						</ActionIcon>
					</Group>
				</td>
			</tr>
		);
	});

	return (
		<Container>
			<Table>
				<thead>
					<tr>
						<th>Email</th>
						<th>Name</th>
						<th>Role</th>
						<th>Status</th>
						<th>Created</th>
						<th>Updated</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<Center>
							<Loader variant="bars" />
						</Center>
					) : (
						rows
					)}
				</tbody>
			</Table>
		</Container>
	);
}
