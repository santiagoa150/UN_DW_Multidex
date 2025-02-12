import { createContext } from 'react';
import { UniverseType } from '../../contexts/universe/domain/universe-type.ts';
import { UniverseTypeNameConstants } from '../../contexts/universe/domain/constants/universe-type-name.constants.ts';

type UniverseContextType = {
    universeType?: UniverseType;
    setUniverseType: (universe: UniverseTypeNameConstants) => void;
    toggleUniverse: () => void;
};

export const UniverseContext = createContext<UniverseContextType | undefined>(undefined);
