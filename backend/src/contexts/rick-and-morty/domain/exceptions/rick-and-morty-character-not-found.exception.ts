import { Exception } from '../../../shared/domain/exceptions/exception';
import { RickAndMortyExceptionMessagesConstants } from './rick-and-morty-exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Exception for when a Rick and Morty character is not found.
 */
export class RickAndMortyCharacterNotFoundException extends Exception {
    constructor() {
        super(RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
