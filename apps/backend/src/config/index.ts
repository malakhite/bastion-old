import { ConfigObject } from '@nestjs/config';

export default (): ConfigObject => ({
	host: process.env.HOST || 'localhost',
	port: parseInt(process.env.PORT as string, 10) || 3333,
	database: {
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		synchronize: process.env.NODE_ENV !== 'production',
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'abcd1234',
	},
	s3: {
		key_id: process.env.AWS_ACCESS_KEY_ID,
		secret_key: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
		bucket_name: process.env.S3_BUCKET_NAME,
	},
	seeds: {
		roles: {
			admin:
				process.env.ROLE_ID_ADMIN ||
				'ec7fa913-f845-4a12-bd2f-582391c6acc1',
			user:
				process.env.ROLE_ID_USER ||
				'62d3c014-ed40-4cb2-9432-981d56709d15',
			guest:
				process.env.ROLE_ID_GUEST ||
				'8fda5dcf-7b6a-4ff3-bea7-99419ca4c58d',
		},
		user: {
			admin: {
				id:
					process.env.ADMIN_USER_ID ||
					'a13b2528-3e11-4dd2-a172-ba0619007df9',
				email: process.env.ADMIN_USER_EMAIL,
				name: process.env.ADMIN_USER_NAME,
				password: process.env.ADMIN_USER_PASSWORD,
			},
			test: {
				id:
					process.env.TEST_USER_ID ||
					'e28c4834-d1c4-4d6a-af5c-1af20f83b09d',
				email: process.env.TEST_USER_EMAIL,
				name: process.env.TEST_USER_NAME,
				password:
					process.env.TEST_USER_PASSWORD ||
					process.env.ADMIN_USER_PASSWORD,
			},
		},
	},
});
