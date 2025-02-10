import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UniverseType } from '../contexts/universe/domain/universe-type.ts';
import { getCurrentUniverseApplication, setCurrentUniverseApplication } from './app.providers.ts';
import { UniverseTypeNameConstants } from '../contexts/universe/domain/constants/universe-type-name.constants.ts';
import { UniverseTypeNameToPropertiesConstants } from '../contexts/universe/domain/constants/universe-type-name-to-properties.constants.ts';

type UniverseContextType = {
    universeType?: UniverseType;
    setUniverseType: (universe: UniverseTypeNameConstants) => void;
    toggleUniverse: () => void;
};

const UniverseContext = createContext<UniverseContextType | undefined>(undefined);

export function UniverseProvider({ children }: { children: ReactNode }) {
    const [universeType, setUniverseType] = useState<UniverseType | undefined>();

    useEffect(() => {
        getCurrentUniverseApplication.exec().then(setUniverseType);
    }, []);

    const setUniverseTypeLocal = (universeTypeName: UniverseTypeNameConstants) => {
        const universeType = UniverseTypeNameToPropertiesConstants[universeTypeName];
        setCurrentUniverseApplication.exec(universeTypeName);
        setUniverseType(universeType);
    };

    const toggleUniverse = () => {
        const newUniverseName =
            universeType?.name === UniverseTypeNameConstants.POKEMON
                ? UniverseTypeNameConstants.RICK_AND_MORTY
                : UniverseTypeNameConstants.POKEMON;

        setUniverseTypeLocal(newUniverseName);
    };

    return (
        <UniverseContext.Provider value={{ universeType, setUniverseType: setUniverseTypeLocal, toggleUniverse }}>
            {children}
        </UniverseContext.Provider>
    );
}

export function useUniverse() {
    const context = useContext(UniverseContext);
    if (!context) {
        throw new Error('useUniverse debe usarse dentro de un UniverseProvider');
    }
    return context;
}
