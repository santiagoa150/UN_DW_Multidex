import Routes from './routes.tsx';
import { Outlet } from 'react-router-dom';

/**
 * The main application component that sets up the routing.
 * @constructor
 */
function App() {
    return (
        <>
            <Routes>
                <Outlet />
            </Routes>
        </>
    );
}

export default App;
