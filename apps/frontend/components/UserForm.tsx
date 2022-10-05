import { PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { UserResponse } from '../lib/api/users';

interface IUserFormProps {
	user: null | UserResponse;
}

export default function UserForm({ user }: IUserFormProps) {
	const userForm = useForm({
		initialValues: {
			email: user?.email || '',
			name: user?.name || '',
			password: '',
			confirmPassword: '',
		},
	});
	return (
		<form
			onSubmit={userForm.onSubmit(() => {
				return;
			})}
		>
			<TextInput
				withAsterisk
				label="Email"
				{...userForm.getInputProps('email')}
			/>
			<TextInput
				withAsterisk
				label="Name"
				{...userForm.getInputProps('name')}
			/>
			<PasswordInput
				label="Password"
				{...userForm.getInputProps('password')}
			/>
			<PasswordInput
				label="Confirm Password"
				{...userForm.getInputProps('confirmPassword')}
			/>
		</form>
	);
}
