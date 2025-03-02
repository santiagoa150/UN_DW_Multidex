import { HttpStatus } from '@nestjs/common';
import { UserExceptionMessagesConstants } from './user-exception-messages.constants';
import { Exception } from '../../../shared/domain/exceptions/exception';

/**
 * Exception for when a user password is not valid.
 */
export class UserPasswordNotValidException extends Exception {
    constructor() {
        super(UserExceptionMessagesConstants.USER_PASSWORD_NOT_VALID, HttpStatus.BAD_REQUEST);
    }
}
