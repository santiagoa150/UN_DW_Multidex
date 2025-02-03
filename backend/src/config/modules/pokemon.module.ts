import { Logger, Module, Provider } from '@nestjs/common';
import { PgPokemonRepository } from '../../contexts/pokemon/infrastructure/postgres/pg-pokemon.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgPokemonModel } from '../../contexts/pokemon/infrastructure/postgres/pg-pokemon.model';
import { GetPokemonByIdQueryHandler } from '../../contexts/pokemon/applications/by-id/get-pokemon-by-id.query-handler';
import { GetPokemonByIdApplication } from '../../contexts/pokemon/applications/by-id/get-pokemon-by-id.application';

/**
 * `PROVIDERS` is an array of NestJS providers related to pokémon module.
 */
const PROVIDERS: Provider[] = [PgPokemonRepository];

/**
 * `APPLICATIONS` is an array of applications related to pokémon module.
 */
const APPLICATIONS: Provider[] = [
    {
        inject: [Logger, PgPokemonRepository],
        provide: GetPokemonByIdApplication,
        useFactory: (logger: Logger, repository: PgPokemonRepository) => {
            return new GetPokemonByIdApplication(logger, repository);
        },
    },
];

/**
 * `QUERIES` is an array of query handlers related to pokémon module.
 */
const QUERIES: Provider[] = [GetPokemonByIdQueryHandler];

@Module({
    imports: [SequelizeModule.forFeature([PgPokemonModel])],
    providers: [...PROVIDERS, ...APPLICATIONS, ...QUERIES],
})
export class PokemonModule {}
