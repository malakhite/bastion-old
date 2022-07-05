/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Admin() {
	const { data: session, status } = useSession();

	if (!session && status === 'loading') {
		return <div>Authenticating...</div>;
	}

	if (!session) {
		return (
			<>
				Not signed in. <br />
				<button
					onClick={async (e) => {
						e.preventDefault();
						await signIn();
					}}
				>
					Sign in
				</button>
			</>
		);
	}

	return (
		<>
			Signed in as {session?.user?.email}. <br />
			{JSON.stringify(session)} <br />
			<button
				onClick={async (e) => {
					e.preventDefault();
					await signOut();
				}}
			>
				Sign out
			</button>
		</>
	);
}
