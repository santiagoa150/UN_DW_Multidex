import { UniverseTypeNameConstants } from './constants/universe-type-name.constants.ts';

/**
 * The definition of a universe entity.
 */
export type UniverseEntity = {
    id: number;
    name: string;
    universeType: UniverseTypeNameConstants;
    entityTypes: string[];
    frontImageUrl: string;
    description: string;
    height?: number;
    weight?: number;
    status?: string;
    gender?: string;
    location?: string;
    origin?: string;
};
