import { Exception } from '../../../shared/domain/exceptions/exception';
import { UserExceptionMessagesConstants } from './user-exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Exception for when a user is not found.
 */
export class UserNotFoundException extends Exception {
    constructor() {
        super(UserExceptionMessagesConstants.USER_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
}
