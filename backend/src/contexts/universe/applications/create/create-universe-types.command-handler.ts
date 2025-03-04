import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUniverseTypesCommand } from './create-universe-types.command';
import { UniverseType } from '../../domain/universe-type';
import { CreateUniverseTypesApplication } from './create-universe-types.application';

/**
 * `CreateUniverseTypesCommandHandler` is a command handler that is responsible for the creation of universe types.
 */
@CommandHandler(CreateUniverseTypesCommand)
export class CreateUniverseTypesCommandHandler implements ICommandHandler<CreateUniverseTypesCommand, UniverseType[]> {
    /**
     * @param _app - The application to create universe types.
     */
    constructor(private readonly _app: CreateUniverseTypesApplication) {}

    /**
     * Method that handles the command.
     * @returns The universe types created.
     */
    execute(): Promise<UniverseType[]> {
        return this._app.exec();
    }
}
