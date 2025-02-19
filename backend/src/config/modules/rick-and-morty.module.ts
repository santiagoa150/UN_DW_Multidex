import { Module, Provider } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgRickAndMortyCharacterModel } from '../../contexts/rick-and-morty/infrastructure/postgres/pg-rick-and-morty-character.model';
import { PgRickAndMortyRepository } from '../../contexts/rick-and-morty/infrastructure/postgres/pg-rick-and-morty.repository';
import { GetRickAndMortyCharacterByIdQueryHandler } from '../../contexts/rick-and-morty/applications/get/character-by-id/get-rick-and-morty-character-by-id.query-handler';
import { GetRickAndMortyCharacterByIdApplication } from '../../contexts/rick-and-morty/applications/get/character-by-id/get-rick-and-morty-character-by-id.application';
import { LoadRickAndMortyCharactersCommandHandler } from '../../contexts/rick-and-morty/applications/load/load-rick-and-morty-characters.command-handler';
import { LoadRickAndMortyCharactersApplication } from '../../contexts/rick-and-morty/applications/load/load-rick-and-morty-characters.application';
import { CommandBus } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { DeleteRickAndMortyCharacterByIdAndUserCommandHandler } from '../../contexts/rick-and-morty/applications/delete/delete-rick-and-morty-character-by-id-and-user.command-handler';
import { DeleteRickAndMortyCharacterByIdAndUserApplication } from '../../contexts/rick-and-morty/applications/delete/delete-rick-and-morty-character-by-id-and-user.application';
import { GetAllRickAndMortyCharactersQueryHandler } from '../../contexts/rick-and-morty/applications/get/all/get-all-rick-and-morty-characters.query-handler';
import { GetAllRickAndMortyCharactersApplication } from '../../contexts/rick-and-morty/applications/get/all/get-all-rick-and-morty-characters.application';

/**
 * `PROVIDERS` is an array of NestJS providers related to Rick and Morty module.
 */
const PROVIDERS: Provider[] = [PgRickAndMortyRepository];

/**
 * `APPLICATIONS` is an array of applications related to Rick and Morty module.
 */
const APPLICATIONS: Provider[] = [
    {
        inject: [PgRickAndMortyRepository],
        provide: GetRickAndMortyCharacterByIdApplication,
        useFactory: (repository: PgRickAndMortyRepository) => {
            return new GetRickAndMortyCharacterByIdApplication(repository);
        },
    },
    {
        inject: [CommandBus, HttpService, PgRickAndMortyRepository],
        provide: LoadRickAndMortyCharactersApplication,
        useFactory: (commandBus: CommandBus, httpService: HttpService, repository: PgRickAndMortyRepository) => {
            return new LoadRickAndMortyCharactersApplication(commandBus, repository, httpService);
        },
    },
    {
        inject: [PgRickAndMortyRepository],
        provide: DeleteRickAndMortyCharacterByIdAndUserApplication,
        useFactory: (repository: PgRickAndMortyRepository) => {
            return new DeleteRickAndMortyCharacterByIdAndUserApplication(repository);
        },
    },
    {
        inject: [PgRickAndMortyRepository],
        provide: GetAllRickAndMortyCharactersApplication,
        useFactory: (repository: PgRickAndMortyRepository) => {
            return new GetAllRickAndMortyCharactersApplication(repository);
        },
    },
];

/**
 * `QUERIES` is an array of query handlers related to Rick and Morty module.
 */
const QUERIES: Provider[] = [GetRickAndMortyCharacterByIdQueryHandler, GetAllRickAndMortyCharactersQueryHandler];

/**
 * `COMMANDS` is an array of command handlers related to Rick and Morty module.
 */
const COMMANDS: Provider[] = [
    LoadRickAndMortyCharactersCommandHandler,
    DeleteRickAndMortyCharacterByIdAndUserCommandHandler,
];

@Module({
    imports: [SequelizeModule.forFeature([PgRickAndMortyCharacterModel])],
    providers: [...PROVIDERS, ...APPLICATIONS, ...QUERIES, ...COMMANDS],
})
export class RickAndMortyModule {}
