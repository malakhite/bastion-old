import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { ContextModalProps } from '@mantine/modals';
import { z } from 'zod';
import { useAuth } from '../../lib/hooks/useAuth';

const schema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string(),
});

export function LoginModal({ context, id, innerProps }: ContextModalProps) {
	const { doLogin } = useAuth();
	const loginForm = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: zodResolver(schema),
	});

	return (
		<form onSubmit={loginForm.onSubmit(doLogin)}>
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
				<Button type="submit">Login</Button>
			</Stack>
		</form>
	);
}
