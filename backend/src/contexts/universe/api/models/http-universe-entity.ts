import { UniverseEntityDto } from '../../infrastructure/universe-entity.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { UniverseExceptionMessagesConstants } from '../../domain/exceptions/universe-exception-messages.constants';
import { UniverseTypeNameConstants } from '../../domain/constants/universe-type-name.constants';

/**
 * Represents a universe entity in the HTTP layer.
 */
export class HttpUniverseEntity implements UniverseEntityDto {
    @ApiProperty({ description: 'The entity id.' })
    @IsInt({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_ID_MUST_BE_A_NUMBER })
    id: number;

    @ApiProperty({ description: 'The entity name.' })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_NAME_IS_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_NAME_MUST_BE_A_STRING })
    name: string;

    @ApiProperty({ description: 'The entity type.' })
    @IsEnum(UniverseTypeNameConstants, { message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_NOT_VALID })
    @IsNotEmpty({ message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_IS_REQUIRED })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_TYPE_MUST_BE_A_STRING })
    type: string;
}
