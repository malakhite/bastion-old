import { z } from 'zod';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
	SYNCHRONIZE_DB: z.string().transform((val) => {
		return val === 'true';
	}),
	SESSION_TTL: z.string().transform((val, ctx) => {
		const parsed = Number.parseInt(val, 10);
		if (Number.isNaN(parsed)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Not a number',
			});
		}
		return parsed * 1000;
	}),
	SESSION_SECRET: z.string(),
	CF_IMAGES_KEY: z.string(),
	CF_IMAGES_ID: z.string(),
	CF_IMAGES_DELIVERY_ID: z.string(),
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
