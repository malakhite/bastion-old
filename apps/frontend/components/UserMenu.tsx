import { Avatar, Button, Group, Menu, Text } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { IconChevronDown } from '@tabler/icons';
import { ModalName } from '../lib/constants';
import { useAuth } from '../lib/hooks/useAuth';
import { useUser } from '../lib/hooks/useUser';

export default function UserMenu() {
	const { doLogout, email } = useAuth();
	const { user } = useUser({ email });

	if (email && user) {
		return (
			<Menu width={260} position="bottom-end" transition="pop-top-right">
				<Menu.Target>
					<Button variant="outline">
						<Group spacing={7}>
							<Avatar
								src={user?.image?.variants[0].image_url}
								alt={user?.name}
								radius="xl"
								size={30}
							/>
							<Text size="sm">{user?.name}</Text>
							<IconChevronDown size={12} stroke={1.5} />
						</Group>
					</Button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item component={NextLink} href="/admin">
						Admin
					</Menu.Item>
					<Menu.Item onClick={doLogout}>Logout</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		);
	} else {
		return (
			<Button
				onClick={() =>
					openContextModal({ modal: ModalName.Login, innerProps: {} })
				}
			>
				Login
			</Button>
		);
	}
}
