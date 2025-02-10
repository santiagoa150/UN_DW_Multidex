import { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { useUniverse } from '../../../../../config/UniverseContext.tsx';

export default function UniverseListPage(): JSX.Element {
    const { universeType, toggleUniverse } = useUniverse();
    const navigate = useNavigate();

    return (
        <div
            className="min-h-[135px] flex w-full max-w-full mx-auto"
            style={{ backgroundColor: universeType?.mainColor }}
        >
            {/* Primer contenedor con home */}
            <div className="w-full sm:w-[101px] flex justify-start items-center px-4 sm:px-2 z-10">
                <img src={universeType?.logo_1} alt="Pokemon" className="w-[100px] h-auto object-contain mb-4" />
                <button
                    className="font-bold text-white text-[16px] sm:text-[20px] ml-4 "
                    onClick={() => navigate(RoutesConstants.HOME)}
                >
                    <Link to={RoutesConstants.HOME}>Home</Link>
                </button>
            </div>

            {/* Segundo contenedor con pokedex */}
            <div className="flex-grow flex justify-center items-center">
                <img src={universeType?.logo_2} alt="Pokemon Logo" className="w-full h-[140px] object-contain mb-4" />
            </div>

            {/* Tercer contenedor con cambiar de universo */}
            <div className="w-full sm:w-[101px] flex justify-end items-center px-4 sm:px-2">
                <button onClick={toggleUniverse} className="font-bold text-white text-[16px] sm:text-[20px] mr-6 mb-4">
                    Cambiar Universo
                </button>
                <img
                    src={universeType?.logo_3}
                    alt="perfil"
                    className="w-[80px] sm:w-[100px] h-auto object-contain mb-4"
                />
            </div>
        </div>
    );
}
