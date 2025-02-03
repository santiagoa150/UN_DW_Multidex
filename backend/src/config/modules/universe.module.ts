import { Logger, Module, Provider } from '@nestjs/common';
import { HttpUniverseController } from '../../contexts/universe/api/http-universe.controller';
import {
    GetUniverseEntityByIdAndTypeQueryHandler
} from '../../contexts/universe/applications/get/universe-entity-by-id-and-type/get-universe-entity-by-id-and-type.query-handler';
import {
    GetUniverseEntityByIdAndTypeApplication
} from '../../contexts/universe/applications/get/universe-entity-by-id-and-type/get-universe-entity-by-id-and-type.application';

/**
 * `APPLICATIONS` is an array of applications related to universe module.
 */
const APPLICATIONS: Provider[] = [
    {
        inject: [Logger],
        provide: GetUniverseEntityByIdAndTypeApplication,
        useFactory: (logger: Logger): GetUniverseEntityByIdAndTypeApplication => {
            return new GetUniverseEntityByIdAndTypeApplication(logger);
        }
    }
];

/**
 * `QUERIES` is an array of query handlers related to universe module.
 */
const QUERIES: Provider[] = [
    GetUniverseEntityByIdAndTypeQueryHandler
];

/**
 * `UniverseModule` is a module that groups all universe-related features.
 */
@Module({
    controllers: [HttpUniverseController],
    providers: [...APPLICATIONS, ...QUERIES],
})
export class UniverseModule {}