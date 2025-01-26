import { UniverseTypeNameConstants } from './constants/universe-type-name.constants.ts';

/**
 * The definition of a universe type.
 */
export type UniverseType = {
    name: UniverseTypeNameConstants;
    mainColor: string;
    secondaryColor: string;
    tertiaryColor: string;
};
