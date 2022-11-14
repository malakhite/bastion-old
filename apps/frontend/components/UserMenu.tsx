import { Avatar, Button, Group, Loader, Menu, Text } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import {
	IconChevronDown,
	IconLogout,
	IconSettings,
	IconTool,
} from '@tabler/icons';
import { Role } from '../lib/api/users';
import { ModalName } from '../lib/constants';
import { useAuth } from '../lib/hooks/useAuth';

export default function UserMenu() {
	const { isLoading, logoutMutation, user } = useAuth();

	if (isLoading) {
		return (
			<Button variant="outline">
				<Loader />
			</Button>
		);
	}
	if (user) {
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
					<Menu.Item
						icon={<IconTool size={14} stroke={1.5} />}
						component={NextLink}
						href="/me"
					>
						Account Settings
					</Menu.Item>
					{[Role.ADMIN, Role.OWNER].includes(user.role) && (
						<Menu.Item
							icon={<IconSettings size={14} stroke={1.5} />}
							component={NextLink}
							href="/admin"
						>
							Admin
						</Menu.Item>
					)}
					<Menu.Item
						icon={<IconLogout size={14} stroke={1.5} />}
						onClick={() => logoutMutation.mutate()}
					>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		);
	}
	return (
		<Button
			onClick={() =>
				openContextModal({
					title: 'Please enter your email and password',
					modal: ModalName.Login,
					innerProps: {},
				})
			}
		>
			Login
		</Button>
	);
}
