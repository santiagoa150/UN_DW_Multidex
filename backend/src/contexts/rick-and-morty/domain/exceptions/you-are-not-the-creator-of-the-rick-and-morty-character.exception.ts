import { Exception } from '../../../shared/domain/exceptions/exception';
import { RickAndMortyExceptionMessagesConstants } from './rick-and-morty-exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Exception for when you are not the creator of the Rick and Morty character.
 */
export class YouAreNotTheCreatorOfTheRickAndMortyCharacterException extends Exception {
    constructor() {
        super(
            RickAndMortyExceptionMessagesConstants.YOU_ARE_NOT_THE_CREATOR_OF_THE_RICK_AND_MORTY_CHARACTER,
            HttpStatus.FORBIDDEN,
        );
    }
}
