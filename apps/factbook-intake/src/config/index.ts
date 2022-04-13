import { ConfigObject } from '@nestjs/config';

export default (): ConfigObject => ({
	host: process.env.HOST || 'localhost',
	port: parseInt(process.env.PORT as string, 10) || 3333,
	database: {
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
		username: process.env.DATABASE_USER,
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
});
