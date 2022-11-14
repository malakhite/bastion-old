import { IRequestWithUser } from './interfaces';

export interface BastionSession {
	user: string;
	authProvider: 'local';
}

export type RequestWithSession = IRequestWithUser & {
	session: BastionSession;
};
