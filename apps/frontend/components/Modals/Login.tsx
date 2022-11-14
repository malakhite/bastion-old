import { useCallback } from 'react';
import { Stack, TextInput, PasswordInput, Button, Text } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal, ContextModalProps } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { z } from 'zod';
import { ModalName } from '../../lib/constants';
import { isAxiosError } from '../../lib/api/axios';
import { useAuth } from '../../lib/hooks/useAuth';

const schema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string(),
});

export function LoginModal({ context, id, innerProps }: ContextModalProps) {
	const { loginMutation } = useAuth();
	const { error } = loginMutation;
	const loginForm = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: zodResolver(schema),
	});

	const handleLoginError = useCallback(() => {
		if (isAxiosError(error)) {
			if (error.response.status === 401) {
				return <Text color="red">Incorrect email or password</Text>;
			}
		}

		return '';
	}, [error]);

	return (
		<form
			onSubmit={loginForm.onSubmit((login) =>
				loginMutation.mutate(login, {
					onSuccess: () => {
						closeModal(ModalName.Login);
						showNotification({
							title: 'Login successful',
							message: `Successfully logged in as ${login.email}`,
						});
					},
				}),
			)}
		>
			<Stack>
				<TextInput
					withAsterisk
					label="Email"
					{...loginForm.getInputProps('email')}
				/>
				<PasswordInput
					withAsterisk
					label="Password"
					{...loginForm.getInputProps('password')}
				/>
				{handleLoginError()}
				<Button type="submit">Login</Button>
			</Stack>
		</form>
	);
}
