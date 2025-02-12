import Routes from './routes.tsx';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCurrentUniverseApplication } from './app.providers.ts';
import { UniverseProvider } from './universe/universe-context.tsx';

/**
 * The main application component that sets up the routing.
 * @constructor
 */
function App() {
    const [isCurrentUniverseLoaded, setIsCurrentUniverseLoaded] = useState<boolean>(false);

    /**
     * Load the current universe when the application starts.
     */
    useEffect(() => {
        if (!isCurrentUniverseLoaded) {
            getCurrentUniverseApplication.exec().then(() => setIsCurrentUniverseLoaded(true));
        }
    }, [isCurrentUniverseLoaded]);

    return (
        <>
            <UniverseProvider>
                <Routes>
                    <Outlet />
                </Routes>
            </UniverseProvider>
        </>
    );
}

export default App;
