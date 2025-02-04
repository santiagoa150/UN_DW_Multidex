import { Exception } from '../../../shared/domain/exceptions/exception';
import { PokemonExceptionMessagesConstants } from './pokemon-exception-messages.constants';
import { HttpStatus } from '@nestjs/common';

/**
 * Exception for when a Pokémon is not found.
 */
export class PokemonNotFoundException extends Exception {
    constructor() {
        super(PokemonExceptionMessagesConstants.POKEMON_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
}
