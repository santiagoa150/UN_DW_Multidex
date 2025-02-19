import { PickType } from '@nestjs/swagger';
import { HttpUniverseEntityModel } from '../models/http-universe-entity.model';

/**
 * DTO (Data transfer object) for the default universe entity request.
 */
export class DefaultUniverseEntityRequest extends PickType(HttpUniverseEntityModel, ['id', 'universeType']) {}
