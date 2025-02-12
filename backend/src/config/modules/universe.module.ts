import { Module, Provider } from '@nestjs/common';
import { HttpUniverseController } from '../../contexts/universe/api/http-universe.controller';
import { GetUniverseEntityByIdAndTypeQueryHandler } from '../../contexts/universe/applications/get/universe-entity/by-id-and-type/get-universe-entity-by-id-and-type.query-handler';
import { GetUniverseEntityByIdAndTypeApplication } from '../../contexts/universe/applications/get/universe-entity/by-id-and-type/get-universe-entity-by-id-and-type.application';
import { QueryBus } from '@nestjs/cqrs';
import { NestjsUniverseTask } from '../../contexts/universe/task/nestjs-universe.task';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgUniverseTypeModel } from '../../contexts/universe/infrastructure/postgres/pg-universe-type.model';
import { PgUniverseTypeRepository } from '../../contexts/universe/infrastructure/postgres/pg-universe-type.repository';
import { GetAllUniverseTypesQueryHandler } from '../../contexts/universe/applications/get/universe-type/all/get-all-universe-types.query-handler';
import { GetAllUniverseTypesApplication } from '../../contexts/universe/applications/get/universe-type/all/get-all-universe-types.application';

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
];

/**
 * `QUERIES` is an array of query handlers related to universe module.
 */
const QUERIES: Provider[] = [GetUniverseEntityByIdAndTypeQueryHandler, GetAllUniverseTypesQueryHandler];

/**
 * `UniverseModule` is a module that groups all universe-related features.
 */
@Module({
    imports: [SequelizeModule.forFeature([PgUniverseTypeModel])],
    controllers: [HttpUniverseController, NestjsUniverseTask],
    providers: [...PROVIDERS, ...APPLICATIONS, ...QUERIES],
})
export class UniverseModule {}
