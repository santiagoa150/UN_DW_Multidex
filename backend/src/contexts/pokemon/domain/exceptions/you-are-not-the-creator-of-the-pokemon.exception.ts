import { Exception } from '../../../shared/domain/exceptions/exception';
import { HttpStatus } from '@nestjs/common';
import { PokemonExceptionMessagesConstants } from './pokemon-exception-messages.constants';

/**
 * Exception for when you are not the creator of the Pokémon.
 */
export class YouAreNotTheCreatorOfThePokemonException extends Exception {
    constructor() {
        super(PokemonExceptionMessagesConstants.YOU_ARE_NOT_THE_CREATOR_OF_THE_POKEMON, HttpStatus.FORBIDDEN);
    }
}
