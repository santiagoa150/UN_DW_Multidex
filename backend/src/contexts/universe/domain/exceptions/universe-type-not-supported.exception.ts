import { Exception } from '../../../shared/domain/exceptions/exception';
import { UniverseExceptionMessagesConstants } from './universe-exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Exception for when a universe type is not supported.
 */
export class UniverseTypeNotSupportedException extends Exception {
    constructor() {
        super(UniverseExceptionMessagesConstants.UNIVERSE_TYPE_NOT_SUPPORTED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}