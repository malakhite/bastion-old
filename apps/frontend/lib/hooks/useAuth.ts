import { useLocalStorage } from '@mantine/hooks';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstance, isAxiosError } from '../api/axios';
import { UpdateUserDto, UserResponse } from '../api/users';
import { QueryKeys } from '../react-query/constants';

interface ILogin {
	email: string;
	password: string;
}

async function loginRequest(login: ILogin): Promise<UserResponse> {
	const { data } = await axiosInstance.post<UserResponse>(
		'/v1/auth/login',
		login,
		{ headers: { 'Content-Type': 'application/json' } },
	);

	return data;
}

async function logoutRequest() {
	const { data, status } = await axiosInstance.get<string>('/v1/auth/logout');

	if (status === 200) {
		return;
	}

	console.error(data);
}

// interface UpdateUserParams {
// 	user: UpdateUserDto;
// 	email: string;
// }

// async function updateUser({
// 	user,
// 	email,
// }: UpdateUserParams): Promise<UserResponse> {
// 	const { data } = await axiosInstance.patch<UserResponse>(
// 		`/v1/users/${email}`,
// 		user,
// 	);
// 	return data;
// }

async function updateSelf(user: UpdateUserDto): Promise<UserResponse> {
	const { data } = await axiosInstance.patch<UserResponse>('/me', user);
	return data;
}

async function getUser(signal: AbortSignal): Promise<UserResponse | null> {
	try {
		const { data, status } = await axiosInstance.get<UserResponse>(
			'/v1/me',
			{ signal },
		);

		if (status === 200) {
			return data;
		}
	} catch (err) {
		if (isAxiosError(err)) {
			if (err.response.status === 401) return null;
		}
		console.error(err);
		throw err;
	}
}

export function useAuth() {
	const [email, setEmail, removeEmail] = useLocalStorage<string>({
		key: 'email',
		defaultValue: '',
	});

	const queryClient = useQueryClient();

	const { data: user, isLoading: queryIsLoading } =
		useQuery<UserResponse | null>(
			[QueryKeys.User],
			async ({ signal }) => getUser(signal),
			{
				enabled: !!email,
			},
		);

	const loginMutation = useMutation(loginRequest, {
		onSuccess: (data) => {
			setEmail(data.email);
			return queryClient.invalidateQueries([QueryKeys.User]);
		},
	});

	const logoutMutation = useMutation(logoutRequest, {
		onSuccess: () => {
			removeEmail();
			return queryClient.invalidateQueries([QueryKeys.User]);
		},
	});

	const updateSelfMutation = useMutation(updateSelf, {
		onMutate: async (user) => {
			const { password, ...rest } = user;
			await queryClient.cancelQueries([QueryKeys.User]);
			const previousUser = queryClient.getQueryData<UserResponse>([
				QueryKeys.User,
				email,
			]);
			const newUser = { ...previousUser, ...rest };
			setEmail(newUser.email);
			queryClient.setQueryData([QueryKeys.User], newUser);
			return { previousUser };
		},
		onError: (_err, _updatedUser, context) => {
			setEmail(context.previousUser.email);
			queryClient.setQueryData([QueryKeys.User], context.previousUser);
		},
		onSettled: () => {
			queryClient.invalidateQueries([QueryKeys.User]);
		},
	});

	const isLoading =
		queryIsLoading ||
		loginMutation.isLoading ||
		logoutMutation.isLoading ||
		updateSelfMutation.isLoading;

	return {
		email,
		isLoading,
		loginMutation,
		logoutMutation,
		updateSelfMutation,
		user,
	};
}
