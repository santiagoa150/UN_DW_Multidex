import { PickType } from '@nestjs/swagger';
import { HttpPokemonEntity } from '../model/http-pokemon-entity';

/**
 * DTO (Data Transfer Object) that represents the payload for a get universe entity by type and ID request.
 */
export class GetPokemonDetailsRequest extends PickType(HttpPokemonEntity, ['id']) {}
