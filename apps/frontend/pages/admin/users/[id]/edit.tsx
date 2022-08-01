import {
	Switch,
	TextInput,
	Group,
	Button,
	Alert,
	Loader,
	Container,
	Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useInputState } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { UpdatePassword } from '../../../../components/auth/change-password';
import fetcher from '../../../../data/fetcher';
import { updateUser } from '../../../../data/users';
import type { ReturnUser, User } from '../../../../types/api';

interface EditUserFormProps {
	user: ReturnUser;
}

function EditUserForm({ user }: EditUserFormProps) {
	const { push } = useRouter();
	const { mutate } = useSWRConfig();
	const [pwValue, setPwValue] = useInputState('');
	const initialValues = { ...user, password: pwValue };
	const form = useForm<User>({
		initialValues,
	});

	function pickChangedValues(values: User): Partial<User> {
		const keys = Object.keys(values) as Array<keyof Partial<User>>;
		const userChanges: Record<string, string | boolean> = {};
		for (const key of keys) {
			if (key === 'password' && pwValue) {
				userChanges.password = pwValue;
			} else if (values[key] !== initialValues[key]) {
				const newValue = values[key];
				userChanges[key] = newValue;
			}
		}

		return userChanges as Partial<User>;
	}

	return (
		<form
			onSubmit={form.onSubmit((values) => {
				const newValues = pickChangedValues(values);
				mutate(
					`/v1/users/${values.id}`,
					updateUser(values.id, newValues),
					{
						optimisticData: values,
						revalidate: true,
						rollbackOnError: true,
					},
				);
				mutate(
					`/v1/users`,
					(users: ReturnUser[]) =>
						users.map((user) =>
							user.id === values.id ? values : user,
						),
					{
						revalidate: true,
					},
				);
				push('/admin/users');
			})}
		>
			<Stack sx={{ width: 500 }} mt="md" mx="auto">
				<TextInput
					required
					label="Email"
					{...form.getInputProps('email')}
				/>
				<TextInput
					required
					label="Name"
					{...form.getInputProps('name')}
				/>
				<Switch
					label="Active"
					{...form.getInputProps('is_active', {
						type: 'checkbox',
					})}
				/>
				<Switch
					label="Admin"
					{...form.getInputProps('is_admin', {
						type: 'checkbox',
					})}
				/>
				<UpdatePassword value={pwValue} setValue={setPwValue} />
				<Group position="apart" mt="md">
					<Button type="button" color="red">
						Delete User
					</Button>

					<Group position="right">
						<Link href="/admin/users" passHref>
							<Button component="a" type="button" color="gray">
								Cancel
							</Button>
						</Link>
						<Button type="submit">Save User</Button>
					</Group>
				</Group>
			</Stack>
		</form>
	);
}

export default function EditUser() {
	const { query } = useRouter();
	const { data: user, error } = useSWR<ReturnUser>(
		query.id ? `/v1/users/${query.id}` : null,
		fetcher,
	);

	if (error) {
		console.error(error);
		return (
			<Alert title="Uh oh!" color="red">
				Something went wrong!
			</Alert>
		);
	}

	return (
		<Container>
			{user ? <EditUserForm user={user} /> : <Loader variant="bars" />}
		</Container>
	);
}
