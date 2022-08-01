import fetcher from './fetcher';
import type { CreateUserDto, ReturnUser, UpdateUserDto } from '../types/api';

export async function createUser(createUserDto: CreateUserDto) {
	const newUser = await fetcher<ReturnUser>('/v1/users', {
		method: 'POST',
		body: JSON.stringify(createUserDto),
		headers: {
			'content-type': 'application/json',
		},
	});

	return newUser;
}

export async function updateUser(
	id: string,
	updateUserDto: UpdateUserDto,
): Promise<ReturnUser> {
	const updatedUser = await fetcher<ReturnUser>(`/v1/users/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(updateUserDto),
		headers: {
			'content-type': 'application/json',
		},
	});

	return updatedUser;
}
