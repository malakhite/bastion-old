import { API_HOST } from '../../lib/env';
import { NextApiHandler } from 'next';
import cookie from 'cookie';

export interface User {
	id: string;
	email: string;
	name: string;
	role: string;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
}

export const login: NextApiHandler = async function (req, res) {
	if (req.method === 'POST') {
		const { email, password }: { email: string; password: string } =
			await req.body;
		try {
			if (!email || !password) {
				throw new Error('Email and password are required.');
			}

			const loginRes = await fetch(`${API_HOST}/v1/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
				credentials: 'include',
			});

			const cookies = cookie.parse(loginRes.headers.get('set-cookie'));

			res.setHeader('Set-Cookie', [
				cookie.serialize('connect.sid', cookies['connect.sid'], {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					sameSite: 'strict',
					path: '/',
				}),
			]);

			const user = await loginRes.json();

			res.status(201).send(user);
		} catch (maybeError) {
			if (maybeError.message) {
				res.status(400).send(maybeError.message);
			} else {
				res.status(500).send(maybeError);
			}
		}
	} else {
		res.status(404).send({});
	}
};

export default login;
