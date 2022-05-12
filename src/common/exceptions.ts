export class BadRequestException extends Error {
	readonly statusCode: number = 400;

	constructor(message: string = 'Bad request.') {
		super(message);
	}
}

export class InternalErrorException extends Error {
	readonly statusCode: number = 500;

	constructor(message: string = 'Internal server error.') {
		super(message);
	}
}

export class NotFoundException extends Error {
	readonly statusCode: number = 404;

	constructor(message: string = 'Resource not found.') {
		super(message);
	}
}
