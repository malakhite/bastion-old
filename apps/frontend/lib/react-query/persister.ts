import { get, set, del } from 'idb-keyval';
import type {
	PersistedClient,
	Persister,
} from '@tanstack/react-query-persist-client';
import { axiosInstance } from '../api/axios';

export function createIDBPersister(
	idbValidKey: IDBValidKey = 'bastionPersistance',
): Persister {
	return {
		persistClient: async (client: PersistedClient) => {
			set(idbValidKey, client);
		},
		restoreClient: async () => {
			return await get<PersistedClient>(idbValidKey);
		},
		removeClient: async () => {
			await del(idbValidKey);
		},
	};
}

export function createRemotePersister(): Persister {
	return {
		async persistClient(persistClient) {
			await axiosInstance.put('/v1/cache', { data: persistClient });
		},
		async restoreClient() {
			const { data } = await axiosInstance.get('/v1/cache');
			return data;
		},
		async removeClient() {
			return await axiosInstance.delete('/v1/cache');
		},
	};
}
