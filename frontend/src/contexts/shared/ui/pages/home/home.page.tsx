import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';

export default function HomePage(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to the home page!</h1>
            <div>
                <p>Navigation examples</p>
                <button
                    className="w-[100px] border-2 border-black"
                    onClick={() => navigate(RoutesConstants.LOGIN_PAGE)}
                >
                    Login
                </button>
                <button
                    className="w-[100px] border-2 border-black"
                    onClick={() => navigate(RoutesConstants.SIGNUP_PAGE)}
                >
                    SignUp
                </button>
                <button
                    className="w-[100px] border-2 border-black"
                    onClick={() => navigate(RoutesConstants.UNIVERSE_LIST)}
                >
                    Universe List
                </button>
                <button
                    className="w-[100px] border-2 border-black"
                    onClick={() => navigate(RoutesConstants.UNIVERSE_INFO.replace(':id', '1'))}
                >
                    Universe Info
                </button>
                <button
                    className="w-[100px] border-2 border-black"
                    onClick={() => navigate(RoutesConstants.POKEMON_INFO)}
                >
                    Pokemon Info
                </button>
                <button
                    className="w-[100px] border-2 border-black"
                    onClick={() => navigate(RoutesConstants.UNIVERSE_EDIT)}
                >
                    Universe Edit
                </button>
            </div>
        </div>
    );
}
