import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';
import { SharedStorageConstants } from '../../../../shared/domain/constants/shared-storage.constants.ts';

export default function UniverseListHeader(): JSX.Element {
    const { universeType, toggleUniverse } = useUniverse();
    const navigate = useNavigate();
    const token = localStorage.getItem(SharedStorageConstants.AUTH_TOKEN);

    return (
        <div
            className="min-h-[135px] flex w-full max-w-full mx-auto items-center justify-between px-4"
            style={{ backgroundColor: universeType?.mainColor }}
        >
            {/* Contenedor Izquierdo (Logo y Home) */}
            <div className="flex items-center gap-x-4">
                {/* Logo principal */}
                <img
                    src={universeType?.logo_1}
                    alt="Pokemon"
                    className="w-[60px] sm:w-[80px] h-auto object-contain mx-1 max-[370px]:w-[40px]"
                />

                {/* Botón con imagen y tooltip */}
                <button
                    className="relative group bg-transparent hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                    onClick={() => navigate(RoutesConstants.HOME)}
                >
                    <img
                        src={universeType?.logo_4}
                        alt="home"
                        className="w-[25px] sm:w-[30px] h-auto object-contain max-[370px]:w-[20px]"
                    />

                    {/* Tooltip */}
                    <div className="absolute right-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap">
                        Inicio
                    </div>
                </button>
            </div>

            {/* Contenedor Central (Pokedex) */}
            <div className="hidden sm:flex flex-grow justify-center items-center max-[370px]:hidden">
                <img src={universeType?.logo_2} alt="Pokemon Logo" className="w-[320px] h-[100px] object-contain" />
            </div>

            {/* Contenedor Derecho (Cambiar universo y Cerrar sesión) */}
            <div className="flex items-center gap-x-4">
                <button
                    onClick={toggleUniverse}
                    className="font-bold text-white text-[12px] sm:text-[14px] md:text-[16px] px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-2
                        rounded-xl bg-white/20 backdrop-blur-md
                        transition-all duration-300 hover:bg-white/40 hover:text-gray-200 max-[370px]:text-[10px] max-[370px]:px-2 max-[370px]:py-1"
                    aria-label="Cambiar de universo"
                >
                    ¡A viajar!
                </button>

                {token && (
                    <div className="relative group">
                        <button
                            onClick={() => {
                                localStorage.removeItem(SharedStorageConstants.AUTH_TOKEN);
                                navigate(RoutesConstants.HOME);
                            }}
                            className="transition-transform duration-300 hover:scale-110 focus:outline-none flex items-center justify-center"
                            aria-label="Cerrar sesión"
                        >
                            {universeType?.logo_3 && (
                                <div className="w-[20px] sm:w-[25px] md:w-[30px] h-[20px] sm:h-[25px] md:h-[30px] flex items-center justify-center overflow-hidden max-[370px]:w-[15px] max-[370px]:h-[15px]">
                                    <img
                                        src={universeType?.logo_3}
                                        alt="Cerrar sesión"
                                        className="max-w-full max-h-full object-contain"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            )}
                        </button>
                        {/* Tooltip */}
                        <div className="absolute right-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap">
                            Cerrar sesión
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
