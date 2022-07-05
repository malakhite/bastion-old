/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

const options: NextAuthOptions = {
	providers: [
		Auth0Provider({
			clientId: process.env.AUTH0_CLIENT_ID!,
			clientSecret: process.env.AUTH0_CLIENT_SECRET!,
			issuer: process.env.AUTH0_ISSUER,
		}),
	],
	adapter: PrismaAdapter(prisma),
	theme: {
		colorScheme: 'light',
	},
};

export default NextAuth(options);
