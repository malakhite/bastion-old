import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import { BaseButton } from '../components/Button/Base';
import { UserResponse } from '../lib/api/users';
import { API_HOST } from '../lib/env';
import { useUser } from '../lib/hooks';
import styles from './login.module.scss';

export default function Login() {
	useUser({ redirectTo: '/', redirectIfFound: true });
	const router = useRouter();
	const [errorMsg, setErrorMsg] = useState('');

	const handleSubmit: FormEventHandler<HTMLFormElement> =
		async function handleSubmit(e) {
			e.preventDefault();

			if (errorMsg) setErrorMsg('');

			const body = {
				email: e.currentTarget.email.value,
				password: e.currentTarget.password.value,
			};

			try {
				const url = new URL('/v1/auth/login', API_HOST);
				const res = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				});

				if (res.ok) {
					const user = (await res.json()) as UserResponse;
					localStorage.setItem('userId', user.id.toString());
					router.push('/');
				} else {
					throw new Error(await res.text());
				}
			} catch (error) {
				console.error('An unexpected error occurred: ', error);
				setErrorMsg(error.message);
			}
		};

	return (
		<div className={styles.formContainer}>
			<h2>Login:</h2>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<div>
					<label htmlFor="email">Email:</label>
					<input type="text" id="email" name="email" />
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password" />
				</div>
				<BaseButton type="submit">Submit</BaseButton>
			</form>
		</div>
	);
}
