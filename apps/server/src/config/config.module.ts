import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { isBooleanString } from 'class-validator';
import { z } from 'zod';

function validate(config: Record<string, unknown>) {
	const validator = z.object({
		DATABASE_URL: z.string(),
		SYNCHRONIZE: z
			.string()
			.default('false')
			.refine((value) => isBooleanString(value))
			.transform((value) => Boolean(value)),
	});

	return validator.parse(config);
}

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['../../.env', '../.env', '.env'],
			expandVariables: true,
			validate,
		}),
	],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ServerConfigModule {}
