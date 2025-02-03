import { PickType } from '@nestjs/swagger';
import { HttpUniverseEntity } from '../models/http-universe-entity';

/**
 * DTO (Data Transfer Object) that represents the payload for a get universe entity by type and ID request.
 */
export class GetUniverseEntityByIdAndTypeRequest extends PickType(HttpUniverseEntity, ['id', 'type']) {}
