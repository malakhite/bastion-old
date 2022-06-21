import { useEffect } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { API_HOST } from './env';

import type { User } from '../pages/login';

const fetcher = (id: string) =>
	fetch(`${API_HOST}/v1/users/${id}`, { credentials: 'include' }).then((r) =>
		r.json(),
	);

interface UseUserParams {
	redirectTo?: string;
	redirectIfFound?: boolean;
}

export function useUser({ redirectTo, redirectIfFound }: UseUserParams = {}) {
	const [userId] = useLocalStorage({ key: 'userId', defaultValue: '' });
	const {
		data: user,
		error,
		mutate: mutateUser,
	} = useSWR<User>(userId, fetcher);
	const router = useRouter();
	const finished = Boolean(user);
	const hasUser = Boolean(user?.id);

	useEffect(() => {
		if (!redirectTo || !finished) return;

		if (
			(redirectTo && !redirectIfFound && !hasUser) ||
			(redirectIfFound && hasUser)
		) {
			router.push(redirectTo);
		}
	}, [redirectTo, redirectIfFound, finished, hasUser, router]);

	return error ? null : { user, mutateUser };
}
