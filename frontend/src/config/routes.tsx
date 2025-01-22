import { JSX, ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EnvironmentConstants } from '../contexts/shared/domain/constants/environment.constants.ts';
import { RoutesConstants } from '../contexts/shared/domain/constants/routes.constants.ts';
import UniverseInfoPage from '../contexts/universe/ui/pages/info/universe-info.page.tsx';

/**
 * Routes component that defines the routes of the application.
 * @param props - The children of the component.
 * @param props.children - The children components to wrap around all routes.
 */
export default function Routes(props: { children: ReactNode }): JSX.Element {
    const router = createBrowserRouter([
        {
            children: [
                {
                    path: RoutesConstants.UNIVERSE_INFO,
                    element: <UniverseInfoPage />,
                },
            ],
            element: props.children,
            errorElement:
                import.meta.env.VITE_ENVIRONMENT === EnvironmentConstants.PROD ? (
                    <p>Ops, We have an error!</p>
                ) : undefined,
        },
    ]);
    return <RouterProvider router={router} />;
}
