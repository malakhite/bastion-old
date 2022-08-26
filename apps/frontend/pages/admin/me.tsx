import ProtectedWrapper from 'apps/frontend/components/Protected/Protected';
import { useRouter } from 'next/router';
import { BaseButton } from '../../components/Button/Base';
import useUser from '../../lib/hooks/useUser';
import useLogout from '../../lib/hooks/useLogout';
import style from './me.module.scss';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Me() {
	const logoutMutation = useLogout();
	const { data: user, isLoading } = useUser();
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	if (logoutMutation.isSuccess) {
		router.push('/login');
	}

	useEffect(() => {
		setEmail(user?.email || '');
		setName(user?.name || '');
	}, [user?.email, user?.name]);

	return (
		<ProtectedWrapper>
			<Head>
				<title>Me | scottabbey.com</title>
			</Head>
			{isLoading ? (
				'Loading...'
			) : (
				<div className={style.pageContainer}>
					<h1>Me</h1>
					<form className={style.formContainer}>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor="confirmPassword">
							Confirm Password:
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</form>
					<BaseButton onClick={() => logoutMutation.mutate()}>
						Logout
					</BaseButton>
				</div>
			)}
		</ProtectedWrapper>
	);
}
