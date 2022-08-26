import Link from 'next/link';
import useUser from '../../lib/hooks/useUser';
import style from './Profile.module.scss';

export function Profile() {
	const { data: user, isLoading } = useUser();

	const userInitials =
		user?.name
			.split(' ')
			.map((s) => s.slice(0, 1).toUpperCase())
			.join('') || '';

	return isLoading ? (
		<div className={style.profileContainer}>Loading...</div>
	) : user && user.email ? (
		<Link href="/admin/me">
			<a className={style.profileContainer}>
				<div className={style.profilePicture}>{userInitials}</div>
				<div className={style.name}>{user.name}</div>
			</a>
		</Link>
	) : (
		<Link href="/login">
			<a className={style.profileContainer}>
				<div className={style.login}>Login</div>
			</a>
		</Link>
	);
}
