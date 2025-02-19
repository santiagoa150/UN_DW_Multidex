import { IQuery } from '@nestjs/cqrs';

/**
 * Query for getting all pokémon.
 */
export class GetAllPokemonQuery implements IQuery {
    /**
     * @param page - The page number.
     * @param limit - The page size.
     * @param [nameFilter] - The name filter.
     */
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly nameFilter?: string,
    ) {}
}
