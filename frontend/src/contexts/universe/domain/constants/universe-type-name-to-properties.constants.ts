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
        entityColor: '#FFFFFF',
        allowDetail: true,
        logo_1: '/Pokemon .png',
        logo_2: '/International_pokemon_logo.png',
        logo_3: '/cerrar2.png',
        logo_4: '/inicio.png',
        search: '#FFF4CE',
        detailPath: RoutesConstants.POKEMON_INFO,
        editColor: '#FEEAEA',
        boxEditColor: '#FDC3C3B2',
        indexEdit: '#F6D1E6',
        info: '#addebe',
    },
    [UniverseTypeNameConstants.RICK_AND_MORTY]: {
        name: UniverseTypeNameConstants.RICK_AND_MORTY,
        mainColor: '#365829',
        secondaryColor: '#95B47EE5',
        tertiaryColor: '#7CBC6C',
        entityColor: '#365829',
        allowDetail: false,
        logo_1: '/R_M.png',
        logo_2: '/R_M_NAME.png',
        logo_3: '/cerrar2.png',
        logo_4: '/inicio.png',
        search: '#86efac',
        editColor: '#65A954',
        boxEditColor: '#C9FF8C',
        indexEdit: '#63A419',
        info: '#c2fec3',
    },
};
