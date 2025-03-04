import { JSX, ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EnvironmentConstants } from '../contexts/shared/domain/constants/environment.constants.ts';
import { RoutesConstants } from '../contexts/shared/domain/constants/routes.constants.ts';
import UniverseInfoPage from '../contexts/universe/ui/pages/info/universe-info.page.tsx';
import UniverseListPage from '../contexts/universe/ui/pages/list/universe-list.page.tsx';
import PokemonInfoPage from '../contexts/pokemon/ui/pages/info/pokemon-info.page.tsx';
import LoginPage from '../contexts/shared/ui/pages/login/login.page.tsx';
import SignupPage from '../contexts/shared/ui/pages/signup/signup.page.tsx';
import HomePage from '../contexts/shared/ui/pages/home/home.page.tsx';
import CreatePokemonPage from '../contexts/pokemon/ui/pages/create/create-pokemon.page.tsx';
import CreateRickAndMortyCharacterPage from '../contexts/r&m/ui/pages/create/create-rick-and-morty-character.page.tsx';
import EditRickAndMortyCharacterPage from '../contexts/r&m/ui/pages/edit/edit-rick-and-morty-character.page.tsx';
import EditPokemonPage from '../contexts/pokemon/ui/pages/edit/edit-pokemon.page.tsx';

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
                    path: RoutesConstants.UNIVERSE_LIST,
                    element: <UniverseListPage />,
                },
                {
                    path: RoutesConstants.UNIVERSE_INFO,
                    element: <UniverseInfoPage />,
                },
                {
                    path: RoutesConstants.POKEMON_INFO,
                    element: <PokemonInfoPage />,
                },
                {
                    path: RoutesConstants.POKEMON_CREATE,
                    element: <CreatePokemonPage />,
                },
                {
                    path: RoutesConstants.POKEMON_EDIT,
                    element: <EditPokemonPage />,
                },
                {
                    path: RoutesConstants.RICK_AND_MORTY_CREATE,
                    element: <CreateRickAndMortyCharacterPage />,
                },
                {
                    path: RoutesConstants.RICK_AND_MORTY_EDIT,
                    element: <EditRickAndMortyCharacterPage />,
                },
                {
                    path: RoutesConstants.LOGIN_PAGE,
                    element: <LoginPage />,
                },
                {
                    path: RoutesConstants.SIGNUP_PAGE,
                    element: <SignupPage />,
                },
                {
                    path: RoutesConstants.HOME,
                    element: <HomePage />,
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
