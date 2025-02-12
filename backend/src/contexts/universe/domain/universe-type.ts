import { UniverseTypeNameConstants } from './constants/universe-type-name.constants';

/**
 * Represents a universe type.
 */
export class UniverseType {
    /**
     * @param _name - The name of the universe type
     * @param _priority - The priority of the universe type
     * @param _taskWasExecuted - Indicates whether the task was executed
     */
    constructor(
        private readonly _name: UniverseTypeNameConstants,
        private readonly _priority: number,
        private readonly _taskWasExecuted: boolean,
    ) {}

    get name(): UniverseTypeNameConstants {
        return this._name;
    }

    get priority(): number {
        return this._priority;
    }

    get taskWasExecuted(): boolean {
        return this._taskWasExecuted;
    }
}
