import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../react-query/constants';
import { axiosInstance } from '../api/axios';
import type { UserResponse } from '../api/users';

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

interface IUseUserParams {
	email: string;
}

export function useUser({ email }: IUseUserParams) {
	const { data: user } = useQuery<UserResponse>(
		[QueryKeys.User, email],
		({ signal }) => getUser(email, signal),
	);

	return { user };
}
