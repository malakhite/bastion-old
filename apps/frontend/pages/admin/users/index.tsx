import useSWR, { SWRConfig } from 'swr';
import cookie from 'cookie';
import { Badge, Group, ScrollArea, Table, Text } from '@mantine/core';
import { format } from 'date-fns';
import { API_HOST } from '../../../lib/env';
import { useUser } from '../../../lib/hooks';

import type { GetServerSideProps } from 'next';
import type { User } from '../../login';

interface UserAdminIndexProps {
	fallback: {
		'/v1/users': User[];
	};
}

const rolesMap = {
	owner: { color: 'cyan' },
	admin: { color: 'blue' },
	user: { color: 'green' },
	guest: { color: 'orange' },
};

async function fetcher(endpoint: string) {
	return await fetch(`${API_HOST}${endpoint}`, {
		credentials: 'include',
	}).then((r) => r.json());
}

export function UserAdminIndex({ fallback }) {
	useUser({ redirectTo: '/login' });

	const { data } = useSWR<User[]>('/v1/users', fetcher);

	const rows = data
		? data.map((item) => (
				<tr key={item.id}>
					<td>
						<div>
							<Group spacing="sm">
								<Text size="sm" weight={500}>
									{item.name}
								</Text>
								<Text size="xs" color="dimmed">
									{item.email}
								</Text>
							</Group>
						</div>
					</td>

					<td>
						<Text size="sm" weight={500}>
							{format(
								new Date(item.created_at),
								'MM/dd/yyyy HH:mm',
							)}
						</Text>
					</td>

					<td>
						<Badge color={rolesMap[item.role].color}>
							{item.role}
						</Badge>
					</td>
				</tr>
		  ))
		: [];

	return (
		<SWRConfig value={{ fallback }}>
			<ScrollArea>
				<Table
					sx={{ minWidth: 800 }}
					verticalSpacing="sm"
					striped
					highlightOnHover
				>
					<thead>
						<tr>
							<th>User</th>
							<th>Created</th>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</SWRConfig>
	);
}

export const getServerSideProps: GetServerSideProps<UserAdminIndexProps> =
	async function (context) {
		const {
			req: { cookies },
		} = context;
		const sidCookie = cookie.serialize(
			'connect.sid',
			cookies['connect.sid'],
		);
		const users: User[] = await fetch(`${API_HOST}/v1/users`, {
			credentials: 'include',
			headers: {
				Cookie: sidCookie,
			},
		}).then((r) => r.json());

		return {
			props: {
				fallback: {
					'/v1/users': users,
				},
			},
		};
	};

export default UserAdminIndex;
