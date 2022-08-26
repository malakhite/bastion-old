import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../api/common';
import { UserResponse } from '../api/users';

interface LoginProps {
	email: string;
	password: string;
}

const login = async function login({ email, password }: LoginProps) {
	const url = new URL('/v1/auth/login', baseUrl);
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});

	if (res.ok) {
		const user = (await res.json()) as UserResponse;
		return user;
	} else {
		throw new Error(await res.text());
	}
};

export default function useLogin({ email, password }: LoginProps) {
	return useMutation(['login'], () => login({ email, password }), {
		onSuccess(data) {
			localStorage.setItem('userEmail', data.email);
		},
	});
}
