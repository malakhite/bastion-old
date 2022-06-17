import Joi from 'joi';
import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { API_HOST } from '../lib/env';
import { useLocalStorage } from '@mantine/hooks';

export interface User {
	id: string;
	email: string;
	name: string;
	role: string;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
}

interface LoginFormValues {
	email: string;
	password: string;
}

interface ApiError {
	statusCode: number;
	message: string;
	error?: string;
}

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.message('Invalid email'),
	password: Joi.string(),
});

export function Login() {
	const form = useForm<LoginFormValues>({
		initialValues: {
			email: '',
			password: '',
		},
		schema: joiResolver(schema),
	});

	const [, setUserId] = useLocalStorage<string>({
		key: 'userId',
		defaultValue: '',
	});

	const router = useRouter();

	const handleSubmit = async (values: LoginFormValues): Promise<void> => {
		const response = await fetch(`${API_HOST}/v1/login`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		});

		if (response.ok) {
			const user: User = await response.json();
			setUserId(user.id);
			router.push('/admin');
		} else {
			const error: ApiError = await response.json();
			return Promise.reject(error);
		}
	};

	return (
		<Box sx={{ maxWidth: 300 }} mx="auto">
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<TextInput
					required
					aria-label="Email"
					placeholder="Email"
					{...form.getInputProps('email')}
				/>
				<PasswordInput
					required
					aria-label="Password"
					placeholder="Password"
					mt="lg"
					{...form.getInputProps('password')}
				/>
				<Group position="right" mt="lg">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
	);
}

export default Login;
