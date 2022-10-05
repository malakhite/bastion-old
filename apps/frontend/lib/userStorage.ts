import { UserResponse } from './api/users';

const USER_LOCALSTORAGE_KEY = 'bastion_user';

export function clearStoredUser() {
	if (typeof window === 'undefined') return;
	localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}

export function getStoredUser(): UserResponse | null {
	if (typeof window === 'undefined') return null;
	const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
	return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredUser(user: UserResponse) {
	if (typeof window === 'undefined') return;
	localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
}
