import { Exception } from '../../../shared/domain/exceptions/exception';
import { UserExceptionMessagesConstants } from './user-exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Exception for when a user already exists.
 */
export class UserAlreadyExistsException extends Exception {
    constructor() {
        super(UserExceptionMessagesConstants.USER_ALREADY_EXISTS_ERROR, HttpStatus.BAD_REQUEST);
    }
}
