import {
	Avatar,
	Button,
	Group,
	Menu,
	Modal,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { NextLink } from '@mantine/next';
import { useEffect, useState } from 'react';
import { IconChevronDown } from '@tabler/icons';
import { z } from 'zod';
import { useUser } from '../lib/hooks/useUser';
import { useAuth } from '../lib/hooks/useAuth';

const schema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string(),
});

export default function UserMenu() {
	const auth = useAuth();
	const { user } = useUser();

	const loginForm = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: zodResolver(schema),
	});
	const [modalOpened, setModalOpened] = useState(false);

	useEffect(() => {
		if (user) {
			setModalOpened(false);
		}
	}, [user]);

	if (user) {
		return (
			<Menu width={260} position="bottom-end" transition="pop-top-right">
				<Menu.Target>
					<Button variant="outline">
						<Group spacing={7}>
							<Avatar
								src={user?.image?.variants[0].image_url}
								alt={user.name}
								radius="xl"
								size={30}
							/>
							<Text size="sm">{user.name}</Text>
							<IconChevronDown size={12} stroke={1.5} />
						</Group>
					</Button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item component={NextLink} href="/admin">
						Admin
					</Menu.Item>
					<Menu.Item onClick={auth.signout}>Logout</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		);
	} else {
		return (
			<>
				<Modal
					opened={modalOpened}
					onClose={() => setModalOpened(false)}
					title="Login"
				>
					<form onSubmit={loginForm.onSubmit(auth.signin)}>
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
				</Modal>
				<Button onClick={() => setModalOpened(true)}>Login</Button>
			</>
		);
	}
}
