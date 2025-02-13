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
        private readonly _hp: number,
        private readonly _attack: number,
        private readonly _defense: number,
        private readonly _specialAttack: number,
        private readonly _specialDefense: number,
        private readonly _speed: number,
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

    get hp(): number {
        return this._hp;
    }

    get attack(): number {
        return this._attack;
    }

    get defense(): number {
        return this._defense;
    }

    get specialAttack(): number {
        return this._specialAttack;
    }

    get specialDefense(): number {
        return this._specialDefense;
    }

    get speed(): number {
        return this._speed;
    }
}
