import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			expandVariables: true,
			isGlobal: true,
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().required(),
				HOST: Joi.string().required(),
				PORT: Joi.number().required(),
				DATABASE_URL: Joi.string().required(),
				SYNCHRONIZE_DB: Joi.boolean().required(),
				ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
				ACCESS_TOKEN_SECRET: Joi.string().required(),
			}),
		}),
	],
})
export class BastionConfigModule {}
