import { BaseButton } from '../components/Button/Base';
import styles from './login.module.scss';

export default function Login() {
	return (
		<div className={styles.formContainer}>
			<h2>Login:</h2>
			<form
				action="http://localhost:3333/v1/auth/login"
				method="post"
				className={styles.loginForm}
			>
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
