import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoadPokemonCommand } from '../../pokemon/applications/load/load-pokemon.command';
import { UniverseType } from '../domain/universe-type';
import { GetAllUniverseTypesQuery } from '../applications/get/universe-type/all/get-all-universe-types.query';
import { GetAllUniverseTypesQueryHandler } from '../applications/get/universe-type/all/get-all-universe-types.query-handler';
import { LoadPokemonCommandHandler } from '../../pokemon/applications/load/load-pokemon.command-handler';
import { LoadRickAndMortyCharactersCommandHandler } from '../../rick-and-morty/applications/load/load-rick-and-morty-characters.command-handler';
import { UniverseTypeNameConstants } from '../domain/constants/universe-type-name.constants';
import { LoadRickAndMortyCharactersCommand } from '../../rick-and-morty/applications/load/load-rick-and-morty-characters.command';
import { GetAllPokemonTypesQueryHandler } from '../../pokemon/applications/get/pokemon-types/all/get-all-pokemon-types.query-handler';
import { UpdateUniverseTypeCommandHandler } from '../applications/update/update-universe-type.command-handler';
import { CreateUniverseTypesCommand } from '../applications/create/create-universe-types.command';
import { CreateUniverseTypesCommandHandler } from '../applications/create/create-universe-types.command-handler';
import { CreatePokemonTypesCommandHandler } from '../../pokemon/applications/create/pokemon-types/create-pokemon-types.command-handler';

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
    ) {
        _queryBus.register([GetAllUniverseTypesQueryHandler, GetAllPokemonTypesQueryHandler]);
        _commandBus.register([
            LoadPokemonCommandHandler,
            LoadRickAndMortyCharactersCommandHandler,
            UpdateUniverseTypeCommandHandler,
            CreateUniverseTypesCommandHandler,
            CreatePokemonTypesCommandHandler,
        ]);
    }

    /**
     * Method that is called when the module has been initialized.
     */
    async onModuleInit(): Promise<void> {
        try {
            let universeTypes: UniverseType[] = await this._queryBus.execute(new GetAllUniverseTypesQuery());
            if (universeTypes.length === 0) {
                universeTypes = await this._commandBus.execute<CreateUniverseTypesCommand, UniverseType[]>(
                    new CreateUniverseTypesCommand(),
                );
            }
            for (const universeType of universeTypes.filter((ut) => !ut.taskWasExecuted)) {
                try {
                    switch (universeType.name) {
                        case UniverseTypeNameConstants.POKEMON:
                            await this._commandBus.execute(new LoadPokemonCommand(universeType));
                            break;
                        case UniverseTypeNameConstants.RICK_AND_MORTY:
                            await this._commandBus.execute(new LoadRickAndMortyCharactersCommand(universeType));
                            break;
                    }
                } catch (error) {
                    console.log(error);
                    this._logger.error(`[${this.onModuleInit.name}] Error: ${error?.message ?? JSON.stringify(error)}`);
                }
            }
        } catch (e) {
            this._logger.error(`[${this.onModuleInit.name}] Error: ${e?.message ?? JSON.stringify(e)}`);
        }
    }
}
