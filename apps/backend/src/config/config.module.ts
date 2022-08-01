import { z } from 'zod';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HASHID_DEFAULT_LENGTH } from './constants';

const schema = z.object({
	NODE_ENV: z.string().default('development'),
	HOST: z.string().default('localhost'),
	PORT: z.string().transform((val, ctx) => {
		const parsed = Number.parseInt(val, 10);
		if (Number.isNaN(parsed)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Not a number',
			});
		}
		return parsed;
	}),
	DATABASE_URL: z.string().url(),
	SYNCRHONIZE_DB: z.boolean().default(false),
	ACCESS_TOKEN_EXPIRATION: z.string(),
	ACCESS_TOKEN_SECRET: z.string(),
	HASHID_SALT: z.string(),
	HASHID_MIN_LENGTH: z.string().transform((val, ctx) => {
		if (!val) {
			return HASHID_DEFAULT_LENGTH;
		}
		const parsed = Number.parseInt(val, 10);
		if (Number.isNaN(parsed)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Not a number',
			});
		}
		return parsed;
	}),
});

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			expandVariables: true,
			isGlobal: true,
			validate: (config) => schema.parse(config),
		}),
	],
})
export class BastionConfigModule {}
