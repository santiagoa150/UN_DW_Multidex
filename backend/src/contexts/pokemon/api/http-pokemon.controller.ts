import { Controller, Get, Query } from '@nestjs/common';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { HttpPokemonConstants } from './http-pokemon.constants';
import { QueryBus } from '@nestjs/cqrs';
import { GetPokemonDetailByIdResponse } from './responses/get-pokemon-detail-by-id.response';
import { GetPokemonDetailByIdRequest } from './requests/get-pokemon-detail-by-id.request';
import { GetPokemonDetailByIdQuery } from '../applications/get/pokemon/detail-by-id/get-pokemon-detail-by-id.query';
import { PokemonDetail } from '../domain/pokemon-detail';
import { PokemonMappers } from '../infrastructure/mappers/pokemon.mappers';
import { PokemonMovementMappers } from '../infrastructure/mappers/pokemon-movement.mappers';

/**
 * Controller for the HTTP Pokémon API.
 */
@Controller(HttpPokemonConstants.PREFIX)
@ApiTags(HttpPokemonConstants.API_TAG)
export class HttpPokemonController {
    /**
     * param _queryBus - The query bus.
     */
    constructor(private readonly _queryBus: QueryBus) {}

    /**
     * Retrieves a Pokémon by its ID.
     * @param query - The query parameters.
     * @returns The Pokémon.
     */
    @Get(HttpPokemonConstants.GET_POKEMON_DETAIL_BY_ID)
    @ApiAcceptedResponse({ type: GetPokemonDetailByIdResponse })
    async getPokemonById(@Query() query: GetPokemonDetailByIdRequest): Promise<GetPokemonDetailByIdResponse> {
        const response = new GetPokemonDetailByIdResponse();
        const queryResponse = await this._queryBus.execute<GetPokemonDetailByIdQuery, PokemonDetail>(
            new GetPokemonDetailByIdQuery(query.id),
        );
        response.pokemon = PokemonMappers.pokemon2DTO(queryResponse.pokemon);
        response.evolutionChain = PokemonMappers.pokemon2DTOs(queryResponse.evolutionChain);
        response.movements = PokemonMovementMappers.pokemonMovements2DTOs(queryResponse.movements);
        return response;
    }
}
