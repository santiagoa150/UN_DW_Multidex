import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpPokemonConstants } from './http-pokemon.constants';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPokemonDetailByIdResponse } from './responses/get-pokemon-detail-by-id.response';
import { GetPokemonDetailByIdRequest } from './requests/get-pokemon-detail-by-id.request';
import { GetPokemonDetailByIdQuery } from '../applications/get/pokemon/detail-by-id/get-pokemon-detail-by-id.query';
import { PokemonDetail } from '../domain/pokemon-detail';
import { PokemonMappers } from '../infrastructure/mappers/pokemon.mappers';
import { PokemonMovementMappers } from '../infrastructure/mappers/pokemon-movement.mappers';
import { DefaultResponse } from '../../shared/api/responses/default.response';
import { JwtAuthGuard } from '../../user/infrastructure/nestjs/guards/jwt/jwt-auth.guard';
import { CreatePokemonRequest } from './requests/create-pokemon.request';
import { UpdatePokemonRequest } from './requests/update-pokemon.request';
import { GetUserAuthData } from '../../user/infrastructure/nestjs/guards/get-user-auth-data.decorattor';
import { UserAuthData } from '../../user/domain/user-auth-data';
import { CreatePokemonCommand } from '../applications/create/pokemon/create-pokemon.command';
import { UpdatePokemonCommand } from '../applications/update/update-pokemon.command';

/**
 * Controller for the HTTP Pokémon API.
 */
@Controller(HttpPokemonConstants.PREFIX)
@ApiTags(HttpPokemonConstants.API_TAG)
export class HttpPokemonController {
    /**
     * @param _queryBus - The query bus.
     * @param _commandBus - The command bus.
     */
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _commandBus: CommandBus,
    ) {}

    /**
     * Retrieves a Pokémon by its ID.
     * @param query - The query parameters.
     * @returns The Pokémon.
     */
    @Get(HttpPokemonConstants.GENERAL_POKEMON_ID_URI)
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

    /**
     * Creates a Pokémon.
     * @param body - The request body.
     * @param userAuthData - The user authentication data.
     * @returns The default response.
     */
    @Post(HttpPokemonConstants.GENERAL_POKEMON_ID_URI)
    @ApiAcceptedResponse({ type: DefaultResponse })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createPokemon(
        @Body() body: CreatePokemonRequest,
        @GetUserAuthData() userAuthData: UserAuthData,
    ): Promise<DefaultResponse> {
        await this._commandBus.execute(
            new CreatePokemonCommand(
                userAuthData.userId,
                body.name,
                body.description,
                body.frontImageUrl,
                body.attack,
                body.defense,
                body.height,
                body.hp,
                body.weight,
                body.speed,
                body.specialDefense,
                body.specialAttack,
                body.movements,
                body.types,
                body.evolvesFrom,
            ),
        );
        return new DefaultResponse();
    }

    /**
     * Updates a Pokémon.
     * @param body - The request body.
     * @param userAuthData - The user authentication data.
     * @returns The default response.
     */
    @Patch(HttpPokemonConstants.GENERAL_POKEMON_ID_URI)
    @ApiAcceptedResponse({ type: DefaultResponse })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updatePokemon(
        @Body() body: UpdatePokemonRequest,
        @GetUserAuthData() userAuthData: UserAuthData,
    ): Promise<DefaultResponse> {
        await this._commandBus.execute(
            new UpdatePokemonCommand(
                body.id,
                userAuthData.userId,
                body.name,
                body.description,
                body.frontImageUrl,
                body.attack,
                body.defense,
                body.height,
                body.hp,
                body.weight,
                body.speed,
                body.specialDefense,
                body.specialAttack,
                body.movements,
                body.types,
                body.evolvesFrom,
            ),
        );
        return new DefaultResponse();
    }
}
