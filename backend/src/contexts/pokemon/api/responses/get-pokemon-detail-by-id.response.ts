import { DefaultResponse } from 'src/contexts/shared/api/responses/default.response';
import { HttpPokemonModel } from '../models/http-pokemon.model';
import { ApiProperty } from '@nestjs/swagger';
import { HttpPokemonMovementModel } from '../models/http-pokemon-movement.model';

/**
 * The response for the get pokémon detail by ID request.
 */
export class GetPokemonDetailByIdResponse extends DefaultResponse {
    @ApiProperty({ type: HttpPokemonModel }) pokemon: HttpPokemonModel;
    @ApiProperty({ type: [HttpPokemonMovementModel] }) movements: HttpPokemonMovementModel[];
    @ApiProperty({ type: [HttpPokemonModel] }) evolutionChain: HttpPokemonModel[];
}
