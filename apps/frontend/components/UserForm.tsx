import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import type { UpdateUserDto, UserResponse } from '../lib/api/users';

interface IUserFormProps {
	user: null | UserResponse;
	updateUser: ({
		user,
		email,
	}: {
		user: UpdateUserDto;
		email: string;
	}) => void;
}

export default function UserForm({ user, updateUser }: IUserFormProps) {
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
			onSubmit={userForm.onSubmit((values) => {
				if (
					values.password &&
					values.password === values.confirmPassword
				) {
					updateUser({ user: values, email: user.email });
				} else {
					const { password, confirmPassword, ...rest } = values;
					updateUser({ user: rest, email: user.email });
				}
			})}
		>
			<Stack>
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
				<Button type="submit">Update</Button>
			</Stack>
		</form>
	);
}
