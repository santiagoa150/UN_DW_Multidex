import { UniverseEntity } from '../../universe/domain/universe-entity';
import { UniverseTypeNameConstants } from '../../universe/domain/constants/universe-type-name.constants';

/**
 * Represents a Pokémon in the universe.
 */
export class Pokemon extends UniverseEntity {
    constructor(
        id: number,
        name: string,
        universeType: UniverseTypeNameConstants,
        entityTypes: Set<string>,
        frontImageUrl: string,
        description: string,
        protected readonly _height: number,
        protected readonly _weight: number,
        creatorId?: string,
        creatorName?: string,
    ) {
        super(id, name, universeType, entityTypes, frontImageUrl, description, creatorId, creatorName);
    }

    get height(): number {
        return this._height;
    }

    get weight(): number {
        return this._weight;
    }
}
