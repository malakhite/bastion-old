import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';

export function parseCookies(context: GetServerSidePropsContext) {
	if (context.req.cookies) return context.req.cookies;
	return cookie.parse(
		context.req
			? context.req.headers.cookie || ''
			: window
			? document.cookie
			: '',
	);
}
