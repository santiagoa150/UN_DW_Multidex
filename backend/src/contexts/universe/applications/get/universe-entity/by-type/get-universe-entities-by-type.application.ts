import { Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UniverseTypeNameConstants } from '../../../../domain/constants/universe-type-name.constants';
import { Pagination } from '../../../../../shared/domain/pagination';
import { UniverseEntity } from '../../../../domain/universe-entity';
import { GetAllPokemonQuery } from '../../../../../pokemon/applications/get/pokemon/all/get-all-pokemon.query';
import { Pokemon } from '../../../../../pokemon/domain/pokemon';
import { GetAllRickAndMortyCharactersQuery } from '../../../../../rick-and-morty/applications/get/all/get-all-rick-and-morty-characters.query';
import { RickAndMortyCharacter } from '../../../../../rick-and-morty/domain/rick-and-morty-character';

/**
 * Application for getting universe entities by type.
 */
export class GetUniverseEntitiesByTypeApplication {
    private readonly _logger: Logger = new Logger(GetUniverseEntitiesByTypeApplication.name);

    /**
     * @param _queryBus - The query bus to handle queries.
     */
    constructor(private readonly _queryBus: QueryBus) {}

    /**
     * Application to get universe entities by type.
     * @param type - The universe type.
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     * @returns The list of universe entities.
     */
    async exec(
        type: UniverseTypeNameConstants,
        page: number,
        limit: number,
        nameFilter?: string,
    ): Promise<Pagination<UniverseEntity>> {
        this._logger.log(`[${this.exec.name}] INIT :: type=${type}, page=${page}, limit=${limit}`);
        let entities: Pagination<UniverseEntity>;
        switch (type) {
            case UniverseTypeNameConstants.POKEMON: {
                entities = await this._queryBus.execute<GetAllPokemonQuery, Pagination<Pokemon>>(
                    new GetAllPokemonQuery(page, limit, nameFilter),
                );
                break;
            }
            case UniverseTypeNameConstants.RICK_AND_MORTY: {
                entities = await this._queryBus.execute<
                    GetAllRickAndMortyCharactersQuery,
                    Pagination<RickAndMortyCharacter>
                >(new GetAllRickAndMortyCharactersQuery(page, limit, nameFilter));
                break;
            }
        }
        this._logger.log(`[${this.exec.name}] FINISH ::`);
        return entities;
    }
}
