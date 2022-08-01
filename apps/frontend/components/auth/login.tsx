import {
	Button,
	Container,
	Group,
	PasswordInput,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginForm() {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
	});

	return (
		<Container>
			<form>
				<TextInput
					label="Email"
					placeholder="Email"
					{...form.getInputProps('email')}
				/>
				<PasswordInput
					label="Password"
					placeholder="Password"
					{...form.getInputProps('password')}
				/>
				<Group position="right">
					<Button type="submit">Login</Button>
				</Group>
			</form>
		</Container>
	);
}
