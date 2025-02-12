import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoadUniverseEntitiesCommand } from '../applications/load/load-universe-entities.command';
import { UniverseType } from '../domain/universe-type';
import { GetAllUniverseTypesQuery } from '../applications/get/universe-type/all/get-all-universe-types.query';

/**
 * `NestjsUniverseTask` is a task controller that is responsible for execute processes related to pokémon module.
 */
@Controller()
export class NestjsUniverseTask implements OnModuleInit {
    private readonly _logger: Logger = new Logger(NestjsUniverseTask.name);

    /**
     * @param _queryBus - The query bus instance.
     * @param _commandBus - The event bus instance.
     */
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _commandBus: CommandBus,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            const universeTypes: UniverseType[] = await this._queryBus.execute(new GetAllUniverseTypesQuery());
            for (const universeType of universeTypes) {
                await this._commandBus.execute(new LoadUniverseEntitiesCommand(universeType));
            }
        } catch (e) {
            this._logger.error(`[${this.onModuleInit.name}] Error: ${e?.message ?? JSON.stringify(e)}`);
        }
    }
}
