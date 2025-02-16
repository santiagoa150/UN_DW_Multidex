import { PickType } from '@nestjs/swagger';
import { HttpUniverseEntityModel } from '../models/http-universe-entity.model';

/**
 * DTO (Data Transfer Object) that represents the payload for a get universe entity by type and ID request.
 */
export class GetUniverseEntityByIdAndTypeRequest extends PickType(HttpUniverseEntityModel, ['id', 'universeType']) {}
