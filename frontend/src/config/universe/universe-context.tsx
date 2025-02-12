import { ReactNode, useEffect, useState } from 'react';
import { UniverseType } from '../../contexts/universe/domain/universe-type.ts';
import { getCurrentUniverseApplication, setCurrentUniverseApplication } from '../app.providers.ts';
import { UniverseTypeNameConstants } from '../../contexts/universe/domain/constants/universe-type-name.constants.ts';
import { UniverseTypeNameToPropertiesConstants } from '../../contexts/universe/domain/constants/universe-type-name-to-properties.constants.ts';
import { UniverseContext } from './universe.context.ts';

/**
 * Provider to manage the universe of the application.
 * @param children - The children of the provider.
 */
export function UniverseProvider({ children }: { children: ReactNode }) {
    const [universeType, setUniverseType] = useState<UniverseType | undefined>();

    useEffect(() => {
        getCurrentUniverseApplication.exec().then(setUniverseType);
    }, []);

    /**
     * Sets the universe type.
     * @param universeTypeName - The name of the universe type.
     */
    const setUniverseTypeLocal = (universeTypeName: UniverseTypeNameConstants) => {
        const universeType = UniverseTypeNameToPropertiesConstants[universeTypeName];
        setCurrentUniverseApplication.exec(universeTypeName).then();
        setUniverseType(universeType);
    };

    /**
     * Toggles the universe type.
     */
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
