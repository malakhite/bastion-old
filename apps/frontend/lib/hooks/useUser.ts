import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../react-query/constants';
import { axiosInstance } from '../api/axios';

import type { AxiosResponse } from 'axios';
import type { UserResponse } from '../api/users';

async function getUser(
	user: UserResponse | null,
	signal: AbortSignal,
): Promise<UserResponse | null> {
	if (!user) return null;
	const { data }: AxiosResponse<UserResponse> = await axiosInstance.get(
		`/v1/users/${user.email}`,
		{ signal },
	);

	return data;
}

interface IUseUser {
	user: UserResponse | null;
	updateUser: (user: UserResponse) => void;
	clearUser: () => void;
}

export function useUser(): IUseUser {
	const queryClient = useQueryClient();

	const { data: user } = useQuery<UserResponse>(
		[queryKeys.user],
		({ signal }) => getUser(user, signal),
		{},
	);

	function updateUser(newUser: UserResponse): void {
		queryClient.setQueryData([queryKeys.user], newUser);
	}

	function clearUser() {
		queryClient.setQueryData([queryKeys.user], null);
	}

	return { user, updateUser, clearUser };
}
