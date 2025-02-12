import Routes from './routes.tsx';
import { Outlet } from 'react-router-dom';
import { UniverseProvider } from './universe/universe-context.tsx';

/**
 * The main application component that sets up the routing.
 * @constructor
 */
function App() {
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
