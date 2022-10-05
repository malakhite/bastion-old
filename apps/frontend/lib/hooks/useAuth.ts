import { useLocalStorage } from '@mantine/hooks';
import { closeModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios';
import { UserResponse } from '../api/users';
import { ModalName } from '../constants';
import { QueryKeys } from '../react-query/constants';

interface ILogin {
	email: string;
	password: string;
}

async function loginRequest(login: ILogin) {
	const { data } = await axiosInstance.post<UserResponse>(
		'/v1/auth/login',
		login,
		{ headers: { 'Content-Type': 'application/json' } },
	);

	return data;
}

async function logoutRequest() {
	const { data, status } = await axiosInstance({ url: '/v1/auth/logout' });

	if (status === 200) {
		return null;
	}
	console.error(data);
}

async function getUser(
	email: string | null,
	signal: AbortSignal,
): Promise<UserResponse | null> {
	if (!email) return null;
	const { data } = await axiosInstance.get<UserResponse>(
		`/v1/users/${email}`,
		{ signal },
	);

	return data;
}

export function useAuth() {
	const [email, setEmail, removeEmail] = useLocalStorage<string>({
		key: 'email',
		defaultValue: '',
	});

	const queryClient = useQueryClient();

	const { data: user } = useQuery<UserResponse>(
		[QueryKeys.User, email],
		({ signal }) => getUser(email, signal),
	);

	const loginMutation = useMutation(loginRequest, {
		onSuccess: (data) => {
			closeModal(ModalName.Login);
			setEmail(data.email);
			queryClient.invalidateQueries([QueryKeys.User]);
			queryClient.setQueriesData([QueryKeys.User, data.email], data);
			showNotification({
				title: 'Logged In',
				message: `Logged in as ${data.email}`,
			});
		},
	});

	const logoutMutation = useMutation(logoutRequest, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.User, email]);
			removeEmail();
			showNotification({
				title: 'Signed out!',
				message: 'You have successfully logged out.',
			});
		},
	});

	const doLogin = (login: ILogin) => loginMutation.mutate(login);
	const doLogout = () => logoutMutation.mutate();

	return { doLogin, doLogout, email, user };
}
