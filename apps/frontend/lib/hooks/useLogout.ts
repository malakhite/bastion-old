import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseUrl } from '../api/common';

const logout = async function logout() {
	const url = new URL('/v1/auth/logout', baseUrl);
	const res = await fetch(url);

	if (res.ok) {
		return true;
	}

	throw new Error(await res.text());
};

export default function useLogout() {
	const queryClient = useQueryClient();
	return useMutation(() => logout(), {
		onSuccess() {
			localStorage.removeItem('userEmail');
			queryClient.resetQueries(['user']);
			queryClient.removeQueries();
		},
	});
}
