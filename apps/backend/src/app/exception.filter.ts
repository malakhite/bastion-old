import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { PostgresErrorCode } from '../db/postgresErrorCode.enum';

interface PostgresError extends QueryFailedError {
	code: string;
	table: string;
	detail: string;
}

export class BastionExceptionFilter extends BaseExceptionFilter {
	catch(exception: QueryFailedError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		if (this.isPostgresError(exception)) {
			const { message, table, detail } = exception;
			let status = HttpStatus.BAD_REQUEST;
			switch (exception.code) {
				case PostgresErrorCode.UniqueViolation:
					status = HttpStatus.CONFLICT;
					break;
				default:
					status = HttpStatus.BAD_REQUEST;
			}

			response.status(status).json({
				statusCode: status,
				timestamp: new Date().toISOString(),
				message,
				table,
				detail,
			});
		}

		super.catch(exception, host);
	}

	isPostgresError(e: QueryFailedError | PostgresError): e is PostgresError {
		return (
			(e as PostgresError).code !== undefined &&
			(e as PostgresError).table !== undefined &&
			(e as PostgresError).detail !== undefined
		);
	}
}
