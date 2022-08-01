import { TextInput, Group, Button, Stack, Switch } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useInputState } from '@mantine/hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UpdatePassword } from '../../../components/auth/change-password';
import { createUser } from '../../../data/users';
import type { CreateUserDto } from '../../../types/api';

export default function NewUser() {
	const router = useRouter();
	const [pwValue, setPwValue] = useInputState('');
	const form = useForm<CreateUserDto>({
		initialValues: {
			email: '',
			name: '',
			password: '',
			is_admin: false,
			is_active: false,
		},
	});

	return (
		<form
			onSubmit={form.onSubmit((values) => {
				createUser(values);
				router.push('/admin/users');
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

				<Group position="right">
					<Link href="/admin/users" passHref>
						<Button component="a" type="button" color="gray">
							Cancel
						</Button>
					</Link>
					<Button type="submit">Save User</Button>
				</Group>
			</Stack>
		</form>
	);
}
