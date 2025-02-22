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
import { PgPokemonEvolutionChainModel } from '../../contexts/pokemon/infrastructure/postgres/pg-pokemon-evolution-chain.model';
import { GetPokemonDetailByIdQueryHandler } from 'src/contexts/pokemon/applications/get/pokemon/detail-by-id/get-pokemon-detail-by-id.query-handler';
import { GetPokemonDetailByIdApplication } from 'src/contexts/pokemon/applications/get/pokemon/detail-by-id/get-pokemon-detail-by-id.application';
import { HttpPokemonController } from 'src/contexts/pokemon/api/http-pokemon.controller';
import { DeletePokemonByIdAndUserCommandHandler } from '../../contexts/pokemon/applications/delete/delete-pokemon-by-id-and-user.command-handler';
import { DeletePokemonByIdAndUserApplication } from '../../contexts/pokemon/applications/delete/delete-pokemon-by-id-and-user.application';
import { GetAllPokemonQueryHandler } from '../../contexts/pokemon/applications/get/pokemon/all/get-all-pokemon.query-handler';
import { GetAllPokemonApplication } from '../../contexts/pokemon/applications/get/pokemon/all/get-all-pokemon.application';
import { CreatePokemonCommandHandler } from '../../contexts/pokemon/applications/create/create-pokemon.command-handler';
import { CreatePokemonApplication } from '../../contexts/pokemon/applications/create/create-pokemon.application';
import { UpdatePokemonCommandHandler } from '../../contexts/pokemon/applications/update/update-pokemon.command-handler';
import { UpdatePokemonApplication } from '../../contexts/pokemon/applications/update/update-pokemon.application';

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
    {
        inject: [PgPokemonRepository],
        provide: GetPokemonDetailByIdApplication,
        useFactory: (repository: PokemonRepository) => {
            return new GetPokemonDetailByIdApplication(repository);
        },
    },
    {
        inject: [PgPokemonRepository],
        provide: DeletePokemonByIdAndUserApplication,
        useFactory: (repository: PokemonRepository) => {
            return new DeletePokemonByIdAndUserApplication(repository);
        },
    },
    {
        inject: [PgPokemonRepository],
        provide: GetAllPokemonApplication,
        useFactory: (repository: PokemonRepository) => {
            return new GetAllPokemonApplication(repository);
        },
    },
    {
        inject: [PgPokemonRepository, QueryBus],
        provide: CreatePokemonApplication,
        useFactory: (repository: PokemonRepository, queryBus: QueryBus) => {
            return new CreatePokemonApplication(repository, queryBus);
        },
    },
    {
        inject: [PgPokemonRepository, QueryBus],
        provide: UpdatePokemonApplication,
        useFactory: (repository: PokemonRepository, queryBus: QueryBus) => {
            return new UpdatePokemonApplication(repository, queryBus);
        },
    },
];

/**
 * `QUERIES` is an array of query handlers related to pokémon module.
 */
const QUERIES: Provider[] = [
    GetPokemonByIdQueryHandler,
    GetAllPokemonTypesQueryHandler,
    GetPokemonDetailByIdQueryHandler,
    GetAllPokemonQueryHandler,
];

/**
 * `COMMANDS` is an array of command handlers related to pokémon module.
 */
const COMMANDS: Provider[] = [
    LoadPokemonCommandHandler,
    CreatePokemonCommandHandler,
    UpdatePokemonCommandHandler,
    DeletePokemonByIdAndUserCommandHandler,
];

@Module({
    controllers: [HttpPokemonController],
    imports: [
        SequelizeModule.forFeature([
            PgPokemonModel,
            PgPokemonTypeModel,
            PgPokemonTypeRelationModel,
            PgPokemonMovementModel,
            PgPokemonEvolutionChainModel,
        ]),
    ],
    providers: [...PROVIDERS, ...APPLICATIONS, ...QUERIES, ...COMMANDS],
})
export class PokemonModule {}
