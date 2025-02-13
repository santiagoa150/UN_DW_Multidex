import { UniverseTypeNameConstants } from './constants/universe-type-name.constants';

/**
 * Represents a universe type.
 */
export class UniverseType {
    /**
     * @param _name - The name of the universe type
     * @param _priority - The priority of the universe type
     * @param _taskWasExecuted - Indicates whether the task was executed
     * @param _elementsPerPage - The number of elements per page
     * @param _metadata - The metadata of the universe type
     */
    constructor(
        private readonly _name: UniverseTypeNameConstants,
        private readonly _priority: number,
        private readonly _taskWasExecuted: boolean,
        private readonly _elementsPerPage: number,
        private _metadata?: string,
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

    get elementsPerPage(): number {
        return this._elementsPerPage;
    }

    get metadata(): string | undefined {
        return this._metadata;
    }

    set metadata(metadata: string | undefined) {
        this._metadata = metadata;
    }
}
