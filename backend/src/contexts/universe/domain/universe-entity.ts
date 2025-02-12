import { UniverseTypeNameConstants } from './constants/universe-type-name.constants';

/**
 * Represents an element of the universe.
 */
export class UniverseEntity {
    /**
     * @param _id - The unique identifier of the entity
     * @param _name - The name of the entity
     * @param _universeType - The type of the entity
     * @param _entityTypes - The types of entities that this entity can be related to
     * @param _frontImageUrl - The URL of the image that represents the entity
     * @param _description - The description of the entity
     * @param _creatorId - The unique identifier of the creator
     * @param _creatorName - The name of the creator
     * @param _height - The universe entity height
     * @param _weight - The universe entity weight
     * @param _status - The universe entity status
     * @param _gender - The universe entity gender
     * @param _location - The place where the entity is located
     * @param _origin - The origin place of the entity
     */
    constructor(
        private readonly _id: number,
        private readonly _name: string,
        private readonly _universeType: UniverseTypeNameConstants,
        private readonly _entityTypes: Set<string>,
        private readonly _frontImageUrl: string,
        private readonly _description: string,
        private readonly _creatorId?: string,
        private readonly _creatorName?: string,
        protected readonly _height?: number,
        protected readonly _weight?: number,
        protected readonly _status?: string,
        protected readonly _gender?: string,
        protected readonly _location?: string,
        protected readonly _origin?: string,
    ) {}

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get universeType(): UniverseTypeNameConstants {
        return this._universeType;
    }

    get entityTypes(): Set<string> {
        return this._entityTypes;
    }

    get frontImageUrl(): string {
        return this._frontImageUrl;
    }

    get description(): string {
        return this._description;
    }

    get creatorId(): string {
        return this._creatorId;
    }

    get creatorName(): string {
        return this._creatorName;
    }

    get height(): number | undefined {
        return this._height;
    }

    get weight(): number | undefined {
        return this._weight;
    }

    get status(): string | undefined {
        return this._status;
    }

    get gender(): string {
        return this._gender;
    }

    get location(): string {
        return this._location;
    }

    get origin(): string {
        return this._origin;
    }
}
