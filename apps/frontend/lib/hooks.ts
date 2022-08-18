import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { UserResponse } from './api/users';
import { API_HOST } from './env';

interface UseUserParams {
	redirectTo?: string;
	redirectIfFound?: boolean;
}

async function getUser(userId: string): Promise<UserResponse> {
	const url = new URL(`/v1/auth/${userId}`, API_HOST);
	const response = await fetch(url);

	if (response.ok) {
		return (await response.json()) as UserResponse;
	}

	return null;
}

export async function useUser({
	redirectTo,
	redirectIfFound,
}: UseUserParams = {}) {
	const router = useRouter();
	const userId = useRef('');

	useEffect(() => {
		userId.current = window.localStorage.getItem('userId');
	}, []);

	const {
		data: user,
		isLoading,
		isError,
	} = useQuery(['me', userId.current], () => getUser(userId.current));

	const hasUser = Boolean(user?.id);

	useEffect(() => {
		if (!redirectTo || isLoading) return;

		if (
			(redirectTo && !redirectIfFound && !hasUser) ||
			(redirectIfFound && hasUser)
		) {
			router.push(redirectTo);
		}
	}, [redirectTo, redirectIfFound, isLoading, hasUser, router]);

	return isError ? null : user;
}
