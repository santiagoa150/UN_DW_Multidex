import { createContext } from 'react';
import { UniverseType } from '../../contexts/universe/domain/universe-type.ts';
import { UniverseTypeNameConstants } from '../../contexts/universe/domain/constants/universe-type-name.constants.ts';

type UniverseContextType = {
    universeType?: UniverseType;
    setUniverseType: (universe: UniverseTypeNameConstants) => void;
    toggleUniverse: () => void;
};

/**
 * Context to manage the universe of the application.
 */
export const UniverseContext = createContext<UniverseContextType | undefined>(undefined);
