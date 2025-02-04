import { UniverseEntity } from '../../universe/domain/universe-entity';
import { UniverseTypeNameConstants } from '../../universe/domain/constants/universe-type-name.constants';

/**
 * Represents a Rick and Morty character in the universe.
 */
export class RickAndMortyCharacter extends UniverseEntity {
    constructor(
        id: number,
        name: string,
        universeType: UniverseTypeNameConstants,
        entityTypes: Set<string>,
        frontImageUrl: string,
        description: string,
        protected readonly _status: string,
        protected readonly _gender: string,
        protected readonly _location: string,
        protected readonly _origin: string,
    ) {
        super(id, name, universeType, entityTypes, frontImageUrl, description);
    }

    get status(): string {
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
