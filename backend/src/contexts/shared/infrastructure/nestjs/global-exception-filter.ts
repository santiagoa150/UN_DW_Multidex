import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Exception } from '../../domain/exceptions/exception';
import { SharedMessagesConstants } from '../../domain/exceptions/shared-messages.constants';
import { Response } from 'express';
import { ExceptionDto } from '../../domain/exceptions/exception.dto';

/**
 * Exception filter for handling NestJS exceptions and providing standardized error responses.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) {}

    /**
     * Resolves the error message from various types of exceptions.
     * @param exception - The exception to resolve the message from.
     * @returns The resolved error message.
     */
    public static resolveMessage(exception: unknown): string {
        let data: Array<string> | string = null;
        switch (typeof exception) {
            case 'object':
                if ('response' in exception) {
                    if (typeof exception.response === 'object' && 'message' in exception.response) {
                        data = Array.isArray(exception.response.message)
                            ? exception.response.message
                            : String(exception.response.message);
                    } else {
                        data = Array.isArray(exception.response) ? exception.response : String(exception.response);
                    }
                } else if ('message' in exception) {
                    data = Array.isArray(exception.message) ? exception.message : String(exception.message);
                } else {
                    data = Array.isArray(exception) ? exception : null;
                }
                break;
            case 'string':
                return exception;
        }
        if (Array.isArray(data)) {
            return data?.join(', ');
        } else if (typeof data === 'string') {
            return data;
        }
        try {
            return JSON.stringify(exception);
        } catch (e) {
            return e.toString();
        }
    }

    /**
     * Catches exceptions and sends a standardized error response.
     * @param exception - The exception to catch.
     * @param host - The execution context host.
     */
    catch(exception: Error, host: ArgumentsHost): void {
        this.logger.error(JSON.stringify(exception));
        let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string = SharedMessagesConstants.INTERNAL_SERVER_ERROR;
        if (exception instanceof Exception) {
            statusCode = exception.statusCode;
            message = exception.message;
        } else if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            message = GlobalExceptionFilter.resolveMessage(exception) ?? message;
        } else {
            message = GlobalExceptionFilter.resolveMessage(exception) ?? message;
        }
        const exceptionDto: ExceptionDto = {
            message,
            statusCode,
            timestamp: Date.now().toString(),
        };
        switch (host.getType()) {
            case 'http': {
                const response = host.switchToHttp().getResponse<Response>();
                response.status(exceptionDto.statusCode).json(exceptionDto);
                break;
            }
            default: {
                this.logger.error(`Protocol not supported :: ${host.getType()}`);
                break;
            }
        }
    }
}
