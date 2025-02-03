import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpUniverseConstants } from './http-universe.constants';
import { QueryBus } from '@nestjs/cqrs';

/**
 */
@Controller(HttpUniverseConstants.PREFIX)
@ApiTags(HttpUniverseConstants.API_TAG)
export class HttpUniverseController {
    /**
     * @param _queryBus - The query bus used to dispatch queries.
     */
    constructor(private readonly _queryBus: QueryBus) {}
}
