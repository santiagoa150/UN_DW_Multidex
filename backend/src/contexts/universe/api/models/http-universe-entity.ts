import { UniverseEntityDto } from '../../infrastructure/universe-entity.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UniverseExceptionMessagesConstants } from '../../domain/exceptions/universe-exception-messages.constants';
import { UniverseTypeNameConstants } from '../../domain/constants/universe-type-name.constants';
import { Type } from 'class-transformer';

/**
 * Represents a universe entity in the HTTP layer.
 */
export class HttpUniverseEntity implements UniverseEntityDto {
    @ApiProperty({ description: 'The entity id.' })
    @IsInt({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_ID_MUST_BE_A_NUMBER })
    @Type(() => Number)
    id: number;

    @ApiProperty({ description: 'The entity name.' })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_NAME_IS_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_NAME_MUST_BE_A_STRING })
    name: string;

    @ApiProperty({ description: 'The entity type.' })
    @IsEnum(UniverseTypeNameConstants, { message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_NOT_VALID })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_IS_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_MUST_BE_A_STRING })
    universeType: string;

    @ApiProperty({ description: 'The entity types.' })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_TYPES_ARE_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_TYPES_MUST_BE_STRINGS })
    @IsArray({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_TYPES_MUST_BE_AN_ARRAY })
    entityTypes: string[];

    @ApiProperty({ description: 'The URL of the image that represents the entity.' })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_FRONT_IMAGE_URL_IS_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_FRONT_IMAGE_URL_MUST_BE_A_STRING })
    frontImageUrl: string;

    @ApiProperty({ description: 'The description of the entity.' })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_DESCRIPTION_IS_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_DESCRIPTION_MUST_BE_A_STRING })
    description: string;

    @ApiProperty({ description: 'The height of the entity.' })
    @IsNumber({}, { message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_HEIGHT_MUST_BE_A_NUMBER })
    @IsOptional()
    height?: number;

    @ApiProperty({ description: 'The weight of the entity.' })
    @IsNumber({}, { message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_WEIGHT_MUST_BE_A_NUMBER })
    @IsOptional()
    weight?: number;

    @ApiProperty({ description: 'The status of the entity.' })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_STATUS_MUST_BE_A_STRING })
    @IsOptional()
    status?: string;

    @ApiProperty({ description: 'The gender of the entity.' })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_GENDER_MUST_BE_A_STRING })
    @IsOptional()
    gender?: string;

    @ApiProperty({ description: 'The location of the entity.' })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_LOCATION_MUST_BE_A_STRING })
    @IsOptional()
    location?: string;

    @ApiProperty({ description: 'The origin of the entity.' })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_ORIGIN_MUST_BE_A_STRING })
    @IsOptional()
    origin?: string;

    @ApiProperty({ description: 'The creator id.' })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_CREATOR_ID_MUST_BE_A_STRING })
    @IsOptional()
    creatorId?: string;

    @ApiProperty({ description: 'The creator name.' })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_CREATOR_NAME_MUST_BE_A_STRING })
    @IsOptional()
    creatorName?: string;
}
