import { ApiProperty, PickType } from '@nestjs/swagger';
import { HttpUniverseEntityModel } from '../models/http-universe-entity.model';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SharedExceptionMessagesConstants } from '../../../shared/domain/exceptions/shared-exception-messages.constants';
import { UniverseExceptionMessagesConstants } from '../../domain/exceptions/universe-exception-messages.constants';

/**
 * DTO (Data transfer object) for the get universe entities by type request.
 */
export class GetUniverseEntitiesByTypeRequest extends PickType(HttpUniverseEntityModel, ['universeType']) {
    @ApiProperty({ description: 'The page number.' })
    @IsInt({ message: SharedExceptionMessagesConstants.PAGE_MUST_BE_AN_INTEGER })
    @Type(() => Number)
    @IsNotEmpty({ message: SharedExceptionMessagesConstants.PAGE_IS_REQUIRED })
    page: number;

    @ApiProperty({ description: 'The limit of elements.' })
    @IsInt({ message: SharedExceptionMessagesConstants.LIMIT_MUST_BE_AN_INTEGER })
    @Type(() => Number)
    @IsNotEmpty({ message: SharedExceptionMessagesConstants.LIMIT_IS_REQUIRED })
    limit: number;

    @ApiProperty({ description: 'The name filter.', required: false })
    @IsString({ message: UniverseExceptionMessagesConstants.UNIVERSE_ENTITY_NAME_FILTER_MUST_BE_A_STRING })
    @IsOptional()
    nameFilter?: string;
}
