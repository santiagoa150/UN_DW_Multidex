import { ReactNode, useEffect, useState } from 'react';
import { UniverseType } from '../../contexts/universe/domain/universe-type.ts';
import { getCurrentUniverseApplication, setCurrentUniverseApplication } from '../app.providers.ts';
import { UniverseTypeNameConstants } from '../../contexts/universe/domain/constants/universe-type-name.constants.ts';
import { UniverseTypeNameToPropertiesConstants } from '../../contexts/universe/domain/constants/universe-type-name-to-properties.constants.ts';
import { UniverseContext } from './universe.context.ts';

export function UniverseProvider({ children }: { children: ReactNode }) {
    const [universeType, setUniverseType] = useState<UniverseType | undefined>();

    useEffect(() => {
        getCurrentUniverseApplication.exec().then(setUniverseType);
    }, []);

    const setUniverseTypeLocal = (universeTypeName: UniverseTypeNameConstants) => {
        const universeType = UniverseTypeNameToPropertiesConstants[universeTypeName];
        setCurrentUniverseApplication.exec(universeTypeName).then();
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
