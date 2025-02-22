import { ApiProperty, PickType } from '@nestjs/swagger';
import { HttpRickAndMortyCharacterModel } from '../models/http-rick-and-morty-character.model';
import { IsNotEmpty, IsString } from 'class-validator';
import { RickAndMortyExceptionMessagesConstants } from '../../domain/exceptions/rick-and-morty-exception-messages.constants';

/**
 * Represents a request to update a Rick and Morty character.
 */
export class UpdateRickAndMortyCharacterRequest extends PickType(HttpRickAndMortyCharacterModel, [
    'description',
    'frontImageUrl',
    'gender',
    'location',
    'name',
    'origin',
    'status',
    'id',
]) {
    @ApiProperty({ description: 'The character type.' })
    @IsString({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_TYPE_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_TYPE_IS_REQUIRED })
    type: string;
}
