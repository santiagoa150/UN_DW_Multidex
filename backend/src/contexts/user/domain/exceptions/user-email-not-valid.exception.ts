import { Exception } from '../../../shared/domain/exceptions/exception';
import { UserExceptionMessagesConstants } from './user-exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Exception for when a user email is not valid.
 */
export class UserEmailNotValidException extends Exception {
    constructor() {
        super(UserExceptionMessagesConstants.USER_EMAIL_NOT_VALID, HttpStatus.BAD_REQUEST);
    }
}
