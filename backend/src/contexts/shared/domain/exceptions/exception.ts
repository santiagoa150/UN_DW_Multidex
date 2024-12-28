import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Base class for custom exceptions, extending the HttpException class from NestJS.
 */
export class Exception extends HttpException {
    /**
     * @param message - The message describing the exception.
     * @param statusCode - The HTTP status code of the exception.
     */
    constructor(
        message: string,
        public readonly statusCode: HttpStatus,
    ) {
        super({ message }, statusCode);
    }
}
