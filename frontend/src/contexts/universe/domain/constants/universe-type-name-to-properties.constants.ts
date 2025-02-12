import { UniverseTypeNameConstants } from './universe-type-name.constants.ts';
import { UniverseType } from '../universe-type.ts';
import { RoutesConstants } from '../../../shared/domain/constants/routes.constants.ts';

/**
 * Object that maps the universe type name to its properties.
 */
export const UniverseTypeNameToPropertiesConstants: Record<UniverseTypeNameConstants, UniverseType> = {
    [UniverseTypeNameConstants.POKEMON]: {
        name: UniverseTypeNameConstants.POKEMON,
        mainColor: '#FF5C71',
        secondaryColor: '#FDC3C3B2',
        tertiaryColor: '#FEEAEA',
        allowDetail: true,
        detailPath: RoutesConstants.POKEMON_INFO,

        editColor: '#FEEAEA',
        boxEditColor: '#FDC3C3B2',
        indexEdit: '#F6D1E6',
    },
    [UniverseTypeNameConstants.RICK_AND_MORTY]: {
        name: UniverseTypeNameConstants.RICK_AND_MORTY,
        mainColor: '#365829',
        secondaryColor: '#95B47EE5',
        tertiaryColor: '#7CBC6C',
        allowDetail: false,

        editColor: '#65A954',
        boxEditColor: '#C9FF8C',
        indexEdit: '#63A419',
    },
};
