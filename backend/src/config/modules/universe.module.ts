import { Module, Provider } from '@nestjs/common';
import { HttpUniverseController } from '../../contexts/universe/api/http-universe.controller';
import { GetUniverseEntityByIdAndTypeQueryHandler } from '../../contexts/universe/applications/get/universe-entity/by-id-and-type/get-universe-entity-by-id-and-type.query-handler';
import { GetUniverseEntityByIdAndTypeApplication } from '../../contexts/universe/applications/get/universe-entity/by-id-and-type/get-universe-entity-by-id-and-type.application';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NestjsUniverseTask } from '../../contexts/universe/task/nestjs-universe.task';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgUniverseTypeModel } from '../../contexts/universe/infrastructure/postgres/pg-universe-type.model';
import { PgUniverseTypeRepository } from '../../contexts/universe/infrastructure/postgres/pg-universe-type.repository';
import { GetAllUniverseTypesQueryHandler } from '../../contexts/universe/applications/get/universe-type/all/get-all-universe-types.query-handler';
import { GetAllUniverseTypesApplication } from '../../contexts/universe/applications/get/universe-type/all/get-all-universe-types.application';
import { UpdateUniverseTypeCommandHandler } from '../../contexts/universe/applications/update/update-universe-type.command-handler';
import { UniverseTypeRepository } from '../../contexts/universe/domain/interfaces/universe-type.repository';
import { UpdateUniverseTypeApplication } from '../../contexts/universe/applications/update/update-universe-type.application';
import { DeleteUniverseEntityByIdAndUserCommandHandler } from '../../contexts/universe/applications/delete/by-id-and-user/delete-universe-entity-by-id-and-user.command-handler';
import { DeleteUniverseEntityByIdAndUserApplication } from '../../contexts/universe/applications/delete/by-id-and-user/delete-universe-entity-by-id-and-user.application';
import { GetUniverseEntitiesByTypeQueryHandler } from '../../contexts/universe/applications/get/universe-entity/by-type/get-universe-entities-by-type.query-handler';
import { GetUniverseEntitiesByTypeApplication } from '../../contexts/universe/applications/get/universe-entity/by-type/get-universe-entities-by-type.application';
import { CreateUniverseTypesCommandHandler } from '../../contexts/universe/applications/create/create-universe-types.command-handler';
import { CreateUniverseTypesApplication } from '../../contexts/universe/applications/create/create-universe-types.application';

/**
 * `PROVIDERS` is an array of providers related to universe module.
 */
const PROVIDERS: Provider[] = [PgUniverseTypeRepository];

/**
 * `APPLICATIONS` is an array of applications related to universe module.
 */
const APPLICATIONS: Provider[] = [
    {
        inject: [QueryBus],
        provide: GetUniverseEntityByIdAndTypeApplication,
        useFactory: (queryBus: QueryBus): GetUniverseEntityByIdAndTypeApplication => {
            return new GetUniverseEntityByIdAndTypeApplication(queryBus);
        },
    },
    {
        inject: [PgUniverseTypeRepository],
        provide: GetAllUniverseTypesApplication,
        useFactory: (pgUniverseTypeRepository: PgUniverseTypeRepository): GetAllUniverseTypesApplication => {
            return new GetAllUniverseTypesApplication(pgUniverseTypeRepository);
        },
    },
    {
        inject: [PgUniverseTypeRepository],
        provide: UpdateUniverseTypeApplication,
        useFactory: (repository: UniverseTypeRepository): UpdateUniverseTypeApplication => {
            return new UpdateUniverseTypeApplication(repository);
        },
    },
    {
        inject: [CommandBus],
        provide: DeleteUniverseEntityByIdAndUserApplication,
        useFactory: (commandBus: CommandBus): DeleteUniverseEntityByIdAndUserApplication => {
            return new DeleteUniverseEntityByIdAndUserApplication(commandBus);
        },
    },
    {
        inject: [QueryBus],
        provide: GetUniverseEntitiesByTypeApplication,
        useFactory: (queryBus: QueryBus): GetUniverseEntitiesByTypeApplication => {
            return new GetUniverseEntitiesByTypeApplication(queryBus);
        },
    },
    {
        inject: [PgUniverseTypeRepository],
        provide: CreateUniverseTypesApplication,
        useFactory: (pgUniverseTypeRepository: PgUniverseTypeRepository): CreateUniverseTypesApplication => {
            return new CreateUniverseTypesApplication(pgUniverseTypeRepository);
        },
    },
];

/**
 * `QUERIES` is an array of query handlers related to universe module.
 */
const QUERIES: Provider[] = [
    GetUniverseEntityByIdAndTypeQueryHandler,
    GetAllUniverseTypesQueryHandler,
    GetUniverseEntitiesByTypeQueryHandler,
];

/**
 * `COMMANDS` is an array of command handlers related to universe module.
 */
const COMMANDS: Provider[] = [
    UpdateUniverseTypeCommandHandler,
    DeleteUniverseEntityByIdAndUserCommandHandler,
    CreateUniverseTypesCommandHandler,
];

/**
 * `UniverseModule` is a module that groups all universe-related features.
 */
@Module({
    imports: [SequelizeModule.forFeature([PgUniverseTypeModel])],
    controllers: [HttpUniverseController, NestjsUniverseTask],
    providers: [...PROVIDERS, ...APPLICATIONS, ...QUERIES, ...COMMANDS],
})
export class UniverseModule {}
