import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
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
            <div className="w-full sm:w-[101px] flex justify-between items-center px-4 sm:px-2">
                <img 
                src={universeType?.logo_1} 
                alt="Pokemon" 
                className="w-[80px] sm:w-[100px] h-auto object-contain mb-2 sm:mb-4"/>
                <button
                    className="font-bold text-white text-[14px] sm:text-[16px] md:text-[21px] ml-2 sm:ml-2 z-10 mb-2 sm:mb-4 md:mb-5"
                    onClick={() => navigate(RoutesConstants.HOME)}
                >Home
                </button>
            </div>

            {/* Segundo contenedor con pokedex */}
            <div className="flex-grow flex justify-between items-center">
                <img src={universeType?.logo_2} alt="Pokemon Logo" className="w-full h-[140px] object-contain mb-4" />
            </div>

            {/* Tercer contenedor con cambiar de universo */}
            <div className="w-full sm:w-[101px] flex justify-end items-center px-4 sm:px-2 gap-x-4">
                <button
                 onClick={toggleUniverse} 
                 className="font-bold text-white text-[14px] sm:text-[16px] md:text-[20px] mr-4 sm:mr-6 mb-2 sm:mb-4"
                 >Cambiar Universo</button>
                <img
                    src={universeType?.logo_3}
                    alt="perfil"
                    className="w-[60px] sm:w-[80px] md:w-[100px] h-auto object-contain mb-2 sm:mb-4"
                />
            </div>
        </div>
    );
}
