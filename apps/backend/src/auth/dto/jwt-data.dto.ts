import { ValidRole } from '../decorators/roles.decorator';

export class JWTData {
	email!: string;
	role!: ValidRole;
	sub!: string;
}
