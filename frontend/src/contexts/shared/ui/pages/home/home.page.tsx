import { JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';
import { SharedStorageConstants } from '../../../domain/constants/shared-storage.constants.ts';

export default function HomePage(): JSX.Element {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(SharedStorageConstants.AUTH_TOKEN);
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem(SharedStorageConstants.AUTH_TOKEN);
        setIsAuthenticated(false);
        navigate(RoutesConstants.LOGIN_PAGE);
    };

    return (
        <div>
            {!isAuthenticated && (
                <div className="flex flex-col md:flex-row justify-between items-center p-[1%]">
                    <h1 className="text-5xl sm:text-4xl md:text-5xl font-[Mansalva] text-center md:text-left">Multipokedex</h1>
                    <div className="flex flex-col md:flex-row justify-center md:justify-end w-full md:w-1/2 mt-4 md:mt-0">
                        <button
                            className="font-[Karla] text-lg sm:text-xl md:text-2xl font-semibold rounded-lg md:rounded-xl w-full md:w-60 bg-[#FEEAEA] border-2 border-black p-2"
                            onClick={() => navigate(RoutesConstants.LOGIN_PAGE)}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            className="font-[Karla] text-lg sm:text-xl md:text-2xl font-semibold mt-2 md:mt-0 md:ml-4 rounded-lg md:rounded-xl w-full md:w-60 bg-[#FEEAEA] border-2 border-black p-2"
                            onClick={() => navigate(RoutesConstants.SIGNUP_PAGE)}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            )}

            <div className="font-[Mansalva] text-5xl sm:text-5xl md:text-6xl lg:text-7xl    font-bold text-center my-[4%] mb-[5%]">
                <h1>Bienvenido a los Multiversos</h1>
                <h1>Rick and Morty x Pokémon</h1>
            </div>
            <p className="font-[Mallanna] text-xl lg:text-[28px] sm:text-xl md:text-2xl px-[10%] text-center">
                Explora dos mundos fascinantes en un solo lugar. Viaja a través de portales interdimensionaels al
                caótico y divertido universo de Rick and Morty, o sumérgete en aventuras llenas de criaturas increíbles
                en el maravilloso mundo Pokémon. ¡Elige tu lado y vive la experiencia definitiva!
            </p>
            <div className="flex justify-center my-[3%]">
                <button
                    className="font-[Karla] text-[24px] font-semibold rounded-[15px] w-[240px] bg-[#FEEAEA] border-2 border-black"
                    onClick={() => navigate(RoutesConstants.UNIVERSE_LIST)}
                >
                    ¡Vamos a explorar!
                </button>
            </div>
            {isAuthenticated && (
                <div className="flex justify-center my-[3%]">
                    <button
                        className="font-[Karla] text-[24px] font-semibold rounded-[15px] w-[240px] bg-red-500 text-white border-2 border-black"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
            <div className="relative md:absolute bottom-0 flex w-full justify-center md:justify-end">
                <a href="https://github.com/santiagoa150/UN_DW_Multidex" target="_blank" className="mx-[1%]"><i className="fa fa-github text-[80px] "></i></a>
            </div>
        </div>
    );
}
