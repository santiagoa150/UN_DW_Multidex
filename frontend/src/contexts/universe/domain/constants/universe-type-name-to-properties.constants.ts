import { UniverseTypeNameConstants } from './universe-type-name.constants.ts';
import { UniverseType } from '../universe-type.ts';

/**
 * Object that maps the universe type name to its properties.
 */
export const UniverseTypeNameToPropertiesConstants: Record<UniverseTypeNameConstants, Omit<UniverseType, 'name'>> = {
    [UniverseTypeNameConstants.POKEMON]: {
        mainColor: '#FF5C71',
        secondaryColor: '#FDC3C3B2',
        tertiaryColor: '#FEEAEA',
    },
    [UniverseTypeNameConstants.RICK_AND_MORTY]: {
        mainColor: '#365829',
        secondaryColor: '#95B47EE5',
        tertiaryColor: '#7CBC6C',
    },
};
