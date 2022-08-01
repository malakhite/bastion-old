import useSWR from 'swr';
import fetcher from '../data/fetcher';
import type { ReturnUser } from '../types/api';

export function useUserList() {
	const { data: users = [], error } = useSWR('/v1/users', (url) =>
		fetcher<ReturnUser[]>(url),
	);

	if (error) {
		console.error(error);
	}

	return {
		users,
		isLoading: !error && users && users.length === 0,
		isError: error,
	};
}
