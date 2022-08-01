import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { PostgresError } from './postgres-errors.enum';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(QueryFailedExceptionFilter.name);

	catch(exception: QueryFailedError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const pgError = this.extractPostgresError(exception);

		if (pgError === PostgresError.UniqueViolation) {
			response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
				statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				message: 'An entry with the given values already exists.',
			});
		} else {
			this.logger.error(exception);
			response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				message: 'An internal error occurred.',
			});
		}
	}

	extractPostgresError(exception: QueryFailedError) {
		return exception.driverError.code as PostgresError;
	}
}
