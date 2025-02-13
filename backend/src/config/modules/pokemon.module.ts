import { Module, Provider } from '@nestjs/common';
import { PgPokemonRepository } from '../../contexts/pokemon/infrastructure/postgres/pg-pokemon.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgPokemonModel } from '../../contexts/pokemon/infrastructure/postgres/pg-pokemon.model';
import { GetPokemonByIdQueryHandler } from '../../contexts/pokemon/applications/get/pokemon/by-id/get-pokemon-by-id.query-handler';
import { GetPokemonByIdApplication } from '../../contexts/pokemon/applications/get/pokemon/by-id/get-pokemon-by-id.application';
import { PgPokemonTypeModel } from '../../contexts/pokemon/infrastructure/postgres/pg-pokemon-type.model';
import { PgPokemonTypeRelationModel } from '../../contexts/pokemon/infrastructure/postgres/pg-pokemon-type-relation.model';
import { LoadPokemonCommandHandler } from '../../contexts/pokemon/applications/load/load-pokemon.command-handler';
import { LoadPokemonApplication } from '../../contexts/pokemon/applications/load/load-pokemon.application';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PokemonRepository } from '../../contexts/pokemon/domain/interfaces/pokemon.repository';
import { HttpService } from '@nestjs/axios';
import { GetAllPokemonTypesQueryHandler } from '../../contexts/pokemon/applications/get/pokemon-types/all/get-all-pokemon-types.query-handler';
import { GetAllPokemonTypesApplication } from '../../contexts/pokemon/applications/get/pokemon-types/all/get-all-pokemon-types.application';
import { PgPokemonMovementModel } from '../../contexts/pokemon/infrastructure/postgres/pg-pokemon-movement.model';

/**
 * `PROVIDERS` is an array of NestJS providers related to pokémon module.
 */
const PROVIDERS: Provider[] = [PgPokemonRepository];

/**
 * `APPLICATIONS` is an array of applications related to pokémon module.
 */
const APPLICATIONS: Provider[] = [
    {
        inject: [PgPokemonRepository],
        provide: GetPokemonByIdApplication,
        useFactory: (repository: PgPokemonRepository) => {
            return new GetPokemonByIdApplication(repository);
        },
    },
    {
        inject: [QueryBus, CommandBus, PgPokemonRepository, HttpService],
        provide: LoadPokemonApplication,
        useFactory: (
            queryBus: QueryBus,
            commandBus: CommandBus,
            repository: PokemonRepository,
            httpService: HttpService,
        ) => {
            return new LoadPokemonApplication(queryBus, commandBus, repository, httpService);
        },
    },
    {
        inject: [PgPokemonRepository],
        provide: GetAllPokemonTypesApplication,
        useFactory: (repository: PokemonRepository) => {
            return new GetAllPokemonTypesApplication(repository);
        },
    },
];

/**
 * `QUERIES` is an array of query handlers related to pokémon module.
 */
const QUERIES: Provider[] = [GetPokemonByIdQueryHandler, GetAllPokemonTypesQueryHandler];

/**
 * `COMMANDS` is an array of command handlers related to pokémon module.
 */
const COMMANDS: Provider[] = [LoadPokemonCommandHandler];

@Module({
    imports: [
        SequelizeModule.forFeature([
            PgPokemonModel,
            PgPokemonTypeModel,
            PgPokemonTypeRelationModel,
            PgPokemonMovementModel,
        ]),
    ],
    providers: [...PROVIDERS, ...APPLICATIONS, ...QUERIES, ...COMMANDS],
})
export class PokemonModule {}
