import { Module, Provider } from '@nestjs/common';
import { HttpUniverseController } from '../../contexts/universe/api/http-universe.controller';

/**
 * `APPLICATIONS` is an array of applications related to universe module.
 */
const APPLICATIONS: Provider[] = [];

/**
 * `QUERIES` is an array of query handlers related to universe module.
 */
const QUERIES: Provider[] = [];

/**
 * `UniverseModule` is a module that groups all universe-related features.
 */
@Module({
    controllers: [HttpUniverseController],
    providers: [...APPLICATIONS, ...QUERIES],
})
export class UniverseModule {}