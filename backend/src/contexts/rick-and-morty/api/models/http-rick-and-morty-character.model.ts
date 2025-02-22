import { RickAndMortyCharacterDto } from '../../infrastructure/rick-and-morty-character.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RickAndMortyExceptionMessagesConstants } from '../../domain/exceptions/rick-and-morty-exception-messages.constants';
import { Type } from 'class-transformer';
import { UniverseTypeNameConstants } from '../../../universe/domain/constants/universe-type-name.constants';
import { UniverseExceptionMessagesConstants } from '../../../universe/domain/exceptions/universe-exception-messages.constants';

/**
 * Represents a Rick and Morty character entity in the HTTP layer.
 */
export class HttpRickAndMortyCharacterModel implements RickAndMortyCharacterDto {
    @ApiProperty({ description: 'The character Id' })
    @IsInt({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_ID_MUST_BE_AN_INTEGER })
    @Type(() => Number)
    @IsNotEmpty({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_ID_IS_REQUIRED })
    id: number;

    @ApiProperty({ description: 'The character status.' })
    @IsString({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_STATUS_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_STATUS_IS_REQUIRED })
    status: string;

    @ApiProperty({ description: 'The character gender.' })
    @IsString({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_GENDER_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_GENDER_IS_REQUIRED })
    gender: string;

    @ApiProperty({ description: 'The character location.' })
    @IsString({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_LOCATION_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_LOCATION_IS_REQUIRED })
    location: string;

    @ApiProperty({ description: 'The character origin.' })
    @IsString({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_ORIGIN_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_ORIGIN_IS_REQUIRED })
    origin: string;

    @ApiProperty({ description: 'The character name.' })
    @IsString({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_NAME_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_NAME_IS_REQUIRED })
    name: string;

    @ApiProperty({ description: 'The universe type.' })
    @IsEnum(UniverseTypeNameConstants, { message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_NOT_VALID })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_IS_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_MUST_BE_A_STRING })
    universeType: string;

    @ApiProperty({ description: 'The character species.' })
    @IsString({
        message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_TYPES_MUST_BE_STRINGS,
        each: true,
    })
    @IsNotEmpty({
        message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_TYPES_ARE_REQUIRED,
        each: true,
    })
    @IsArray({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_TYPES_MUST_BE_AN_ARRAY })
    entityTypes: string[];

    @ApiProperty({ description: 'The URL of the image that represents the character.' })
    @IsString({
        message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_FRONT_IMAGE_URL_MUST_BE_A_STRING,
    })
    @IsNotEmpty({
        message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_FRONT_IMAGE_URL_IS_REQUIRED,
    })
    frontImageUrl: string;

    @ApiProperty({ description: 'The description of the rick and morty character.' })
    @IsString({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_DESCRIPTION_MUST_BE_A_STRING })
    @IsNotEmpty({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_DESCRIPTION_IS_REQUIRED })
    description: string;

    @ApiProperty({ description: 'The creator id.' })
    @IsString({ message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_CREATOR_ID_MUST_BE_A_STRING })
    @IsOptional()
    creatorId?: string;

    @ApiProperty({ description: 'The creator name.' })
    @IsString({
        message: RickAndMortyExceptionMessagesConstants.RICK_AND_MORTY_CHARACTER_CREATOR_NAME_MUST_BE_A_STRING,
    })
    @IsOptional()
    creatorName?: string;
}
