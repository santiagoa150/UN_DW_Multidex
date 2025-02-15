import { Controller, Get, Query } from '@nestjs/common';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { HttpPokemonConstants } from './http-pokemon.constants';
import { QueryBus } from '@nestjs/cqrs';
import { GetPokemonDetailsResponse } from './responses/get-pokemon-details.response';
import { GetPokemonDetailsRequest } from './requests/get-pokemon-details.request';
import { GetPokemonDetailsByIdQuery } from '../applications/get/pokemon/details-by-id/get-pokemon-details-by-id.query';
import { PokemonDetails } from '../domain/pokemon-details';
import { PokemonMappers } from '../infrastructure/mappers/pokemon.mappers';
import { PokemonMovementMappers } from '../infrastructure/mappers/pokemon-movement.mappers';

@Controller(HttpPokemonConstants.PREFIX)
@ApiTags(HttpPokemonConstants.API_TAG)
export class HttpPokemonController {

    
    constructor(private readonly _queryBus: QueryBus) {}

    @Get(HttpPokemonConstants.GET_POKEMON_BY_ID)
    @ApiAcceptedResponse({
        type: GetPokemonDetailsResponse
    })
    async getPokemonById(@Query() query:GetPokemonDetailsRequest): Promise<GetPokemonDetailsResponse>{
        const response = new GetPokemonDetailsResponse();
        const queryResponse = await this._queryBus.execute<GetPokemonDetailsByIdQuery,PokemonDetails>(new GetPokemonDetailsByIdQuery(query.id))
        response.pokemon = PokemonMappers.Pokemon2DTO(queryResponse.pokemon)
        response.evolutionChain = PokemonMappers.Pokemon2DTOs(queryResponse.evolutionChain)
        response.movements = PokemonMovementMappers.pokemonMovements2DTOs(queryResponse.movements)

        return response
    }
    
}
