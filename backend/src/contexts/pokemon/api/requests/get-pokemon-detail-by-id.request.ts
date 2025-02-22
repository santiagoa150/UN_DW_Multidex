import { PickType } from '@nestjs/swagger';
import { HttpPokemonModel } from '../models/http-pokemon.model';

/**
 * DTO (Data Transfer Object) that represents the payload for a get pokémon detail by type and ID request.
 */
export class GetPokemonDetailByIdRequest extends PickType(HttpPokemonModel, ['id']) {}
