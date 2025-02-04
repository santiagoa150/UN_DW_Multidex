import { Module, Provider } from '@nestjs/common';
import { HttpUniverseController } from '../../contexts/universe/api/http-universe.controller';
import { GetUniverseEntityByIdAndTypeQueryHandler } from '../../contexts/universe/applications/get/universe-entity-by-id-and-type/get-universe-entity-by-id-and-type.query-handler';
import { GetUniverseEntityByIdAndTypeApplication } from '../../contexts/universe/applications/get/universe-entity-by-id-and-type/get-universe-entity-by-id-and-type.application';
import { QueryBus } from '@nestjs/cqrs';

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
];

/**
 * `QUERIES` is an array of query handlers related to universe module.
 */
const QUERIES: Provider[] = [GetUniverseEntityByIdAndTypeQueryHandler];

/**
 * `UniverseModule` is a module that groups all universe-related features.
 */
@Module({
    controllers: [HttpUniverseController],
    providers: [...APPLICATIONS, ...QUERIES],
})
export class UniverseModule {}
