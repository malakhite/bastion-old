import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { baseUrl } from '../api/common';
import { UserResponse } from '../api/users';

const getUser = async function getUser(userEmail: string | null) {
	if (userEmail === null) return;
	const url = new URL(`/v1/users/${userEmail}`, baseUrl);
	const res = await fetch(url);

	if (res.ok) {
		const user = (await res.json()) as UserResponse;
		return user;
	} else {
		throw new Error(await res.text());
	}
};

export default function useUser() {
	const userEmail = useRef('');

	useEffect(() => {
		userEmail.current = window.localStorage.getItem('userEmail');
	}, []);

	return useQuery(['user'], () => getUser(userEmail.current));
}
