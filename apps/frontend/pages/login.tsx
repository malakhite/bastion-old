import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BaseButton } from '../components/Button/Base';
import useLogin from '../lib/hooks/useLogin';
import styles from './login.module.scss';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const loginMutation = useLogin({ email, password });

	if (loginMutation.isSuccess) {
		router.push('/admin/me');
	}

	return (
		<>
			<Head>
				<title>Login | scottabbey.com</title>
			</Head>
			<div className={styles.formContainer}>
				<h1>Login</h1>
				<form className={styles.loginForm}>
					<div>
						<label htmlFor="email">Email:</label>
						<input
							type="text"
							id="email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<BaseButton
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							loginMutation.mutate();
						}}
					>
						{loginMutation.isLoading ? 'Loading' : 'Login'}
					</BaseButton>
				</form>
			</div>
		</>
	);
}
