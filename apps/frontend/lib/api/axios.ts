import axios from 'axios';
import { baseURL } from './common';

import type { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { baseURL, withCredentials: true };
export const axiosInstance = axios.create(config);
