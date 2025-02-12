import { useContext } from 'react';
import { UniverseContext } from './universe.context.ts';

/**
 * Hook to use the universe of the application.
 */
export function useUniverse() {
    const context = useContext(UniverseContext);
    if (!context) {
        throw new Error('useUniverse debe usarse dentro de un UniverseProvider');
    }
    return context;
}
