import { Table } from '@mantine/core';
import useSWR from 'swr';
import type { User } from '../../../../server/src/auth/entities/user.entity';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersAdmin() {
	const { data, error } = useSWR<User[]>(
		'http://localhost:3333/v1/users',
		fetcher,
	);

	const rows = data?.map((row) => (
		<tr key={row.id}>
			<td>{row.email}</td>
			<td>{row.name}</td>
			<td>{row.is_admin}</td>
			<td>{row.is_active}</td>
			<td>{row.created_at.toLocaleString()}</td>
			<td>{row.updated_at.toLocaleString()}</td>
		</tr>
	));

	return (
		<Table>
			<thead>
				<tr>
					<th>Email</th>
					<th>Name</th>
					<th>Admin</th>
					<th>Active</th>
					<th>Created</th>
					<th>Updated</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
}
