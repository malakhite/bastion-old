import { Container, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import ProtectedWrapper from '../../../components/Protected/Protected';
import { axiosInstance } from '../../../lib/api/axios';
import { UserResponse } from '../../../lib/api/users';
import { QueryKeys } from '../../../lib/react-query/constants';

async function userList(signal: AbortSignal) {
	const { data, status } = await axiosInstance.get<UserResponse[]>(
		'/v1/users',
		{ signal },
	);

	if (status === 200) return data;
}

export default function UsersAdmin() {
	const { data: users } = useQuery(
		[QueryKeys.UserAdmin],
		async ({ signal }) => userList(signal),
	);

	const rows =
		Array.isArray(users) &&
		users.map((user) => (
			<tr key={user.id}>
				<td>{user.email}</td>
				<td>{user.name}</td>
				<td>{user.role}</td>
				<td>{user.is_active ? 'true' : 'false'}</td>
				<td>{user.created_at}</td>
				<td>{user.updated_at}</td>
			</tr>
		));

	return (
		<ProtectedWrapper>
			<Head>
				<title>User Administration | scottabbey.com</title>
			</Head>
			<Container>
				<Table>
					<thead>
						<tr>
							<th>Email</th>
							<th>Name</th>
							<th>Role</th>
							<th>Active</th>
							<th>Created</th>
							<th>Updated</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</Container>
		</ProtectedWrapper>
	);
}
