import { UniverseTypeNameConstants } from '../../universe/domain/constants/universe-type-name.constants';

/**
 * The definition of a Pokémon.
 */
export type Pokemon = {
    id: number;
    name: string;
    universeType: UniverseTypeNameConstants;
    entityTypes: string[];
    frontImageUrl: string;
    description: string;
    height: number;
    weight: number;
    creatorId?: string;
    creatorName?: string;
    attack: number;
    defense: number;
    hp: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
};
