import axios from 'axios';
import { showNotification } from '@mantine/notifications';
import { useUser } from './useUser';
import { axiosInstance } from '../api/axios';

import type { AxiosResponse } from 'axios';
import type { UserResponse } from '../api/users';

interface IUseAuth {
	signin: (values: { email: string; password: string }) => Promise<void>;
	// signup: (email: string, password: string) => Promise<void>;
	signout: () => void;
}

type ErrorResponse = { message: string };
type AuthResponse = UserResponse | ErrorResponse;

export function useAuth(): IUseAuth {
	const SERVER_ERROR = 'There was an error contacting the server';
	const { clearUser, updateUser } = useUser();

	async function authServerCall(
		urlEndpoint: string,
		email: string,
		password: string,
	): Promise<void> {
		try {
			const { data, status }: AxiosResponse<AuthResponse> =
				await axiosInstance({
					url: urlEndpoint,
					method: 'POST',
					data: { email, password },
					headers: { 'Content-Type': 'application/json' },
				});

			if (status === 401) {
				const title = 'Unable to login';
				const message =
					'message' in data ? data.message : 'Unauthorized';
				showNotification({ title, message, color: 'red' });
				return;
			}

			if ('id' in data) {
				showNotification({
					title: 'Logged In',
					message: `Logged in as ${data.email}`,
				});
				updateUser(data);
			}
		} catch (error) {
			const title = 'Error';
			const message =
				axios.isAxiosError(error) &&
				(error.response.data as ErrorResponse).message
					? (error.response.data as ErrorResponse).message
					: SERVER_ERROR;
			showNotification({ title, message, color: 'red' });
		}
	}

	async function signin(values: {
		email: string;
		password: string;
	}): Promise<void> {
		authServerCall('/v1/auth/login', values.email, values.password);
	}

	async function signout(): Promise<void> {
		await axiosInstance({ url: '/v1/auth/logout' });
		clearUser();
		showNotification({
			title: 'Signed out!',
			message: 'You have successfully logged out.',
		});
	}

	return { signin, signout };
}
