import { UniverseTypeNameConstants } from './universe-type-name.constants.ts';
import { RoutesConstants } from '../../../shared/domain/constants/routes.constants.ts';

/**
 * The universe type name to path constants.
 */
export const UniverseTypeNameToPathConstants: Record<UniverseTypeNameConstants, RoutesConstants | undefined> = {
    [UniverseTypeNameConstants.POKEMON]: RoutesConstants.POKEMON_INFO,
    [UniverseTypeNameConstants.RICK_AND_MORTY]: undefined,
};
