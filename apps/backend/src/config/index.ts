/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ConfigObject } from '@nestjs/config';

export default (): ConfigObject => ({
	node_env: process.env.NODE_ENV!,
	backend_host: process.env.BACKEND_HOST!,
	backend_port: parseInt(process.env.BACKEND_PORT! as string, 10),
	database: {
		host: process.env.DATABASE_HOST!,
		port: parseInt(process.env.DATABASE_PORT! as string, 10),
		username: process.env.DATABASE_USERNAME!,
		password: process.env.DATABASE_PASSWORD!,
		synchronize: process.env.NODE_ENV !== 'production',
	},
	jwt: {
		secret: process.env.JWT_SECRET!,
	},
	pulsepoint: {
		baseUrl: process.env.PULSEPOINT_BASEURL,
		agencyList: process.env.PULSEPOINT_AGENCY_LIST,
		incidents: process.env.PULSEPOINT_INCIDENTS,
	},
	session: {
		secret: process.env.SESSION_SECRET!,
	},
	s3: {
		key_id: process.env.AWS_ACCESS_KEY_ID!,
		secret_key: process.env.AWS_SECRET_ACCESS_KEY!,
		region: process.env.AWS_REGION!,
		bucket_name: process.env.S3_BUCKET_NAME!,
	},
});
