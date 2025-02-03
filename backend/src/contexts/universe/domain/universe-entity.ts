import { UniverseTypeNameConstants } from './constants/universe-type-name.constants';

/**
 * Represents an element of the universe.
 */
export class UniverseEntity {
    /**
     * @param _id The unique identifier of the entity
     * @param _name The name of the entity
     * @param _type The type of the entity
     */
    constructor(
        private readonly _id: number,
        private readonly _name: string,
        private readonly _type: UniverseTypeNameConstants,
    ) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get type(): UniverseTypeNameConstants {
        return this._type;
    }
}
