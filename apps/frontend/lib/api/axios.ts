import axios, { AxiosError } from 'axios';
import { baseURL } from './common';

import type { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
	baseURL,
	withCredentials: true,
	headers: { 'Content-Type': 'application/json' },
};
export const axiosInstance = axios.create(config);

export function isAxiosError(error: unknown): error is AxiosError {
	return error instanceof AxiosError;
}
