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
        entityColor : '#FFFFFF',
        allowDetail: true,
        logo_1: '/Pokemon .png',
        logo_2: '/International_pokemon_logo.png',
        logo_3: '/perfil.png',
        search: '#FFF4CE',
        detailPath: RoutesConstants.POKEMON_INFO,
    },
    [UniverseTypeNameConstants.RICK_AND_MORTY]: {
        name: UniverseTypeNameConstants.RICK_AND_MORTY,
        mainColor: '#365829',
        secondaryColor: '#95B47EE5',
        tertiaryColor: '#7CBC6C',
        entityColor : '#365829',
        allowDetail: false,
        logo_1: '/R_M.png',
        logo_2: '/R_M_NAME.png',
        logo_3: '/R_M_PERFIL.png',
        search: '#98F5A9',

    },
};
