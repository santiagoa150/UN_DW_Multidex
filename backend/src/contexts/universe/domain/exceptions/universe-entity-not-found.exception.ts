import { Exception } from '../../../shared/domain/exceptions/exception';
import { UniverseExceptionMessagesConstants } from './universe-exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Exception for when a universe entity is not found.
 */
export class UniverseEntityNotFoundException extends Exception {
    constructor() {
        super(UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
