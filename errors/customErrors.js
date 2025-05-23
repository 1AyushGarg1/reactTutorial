import { StatusCodes } from 'http-status-codes'

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export class BadReqestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export class UnAuthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnAuthenticatedError';
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export class UnAuthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnAuthorizedError';
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}