import { UniverseTypeNameToPropertiesConstants } from '../../../../universe/domain/constants/universe-type-name-to-properties.constants';
import { JSX } from 'react';

export default function UniverseListPage(): JSX.Element {
    const pokemonColors = UniverseTypeNameToPropertiesConstants.POKEMON;

    return (
        <div className="min-h-[135px] flex w-full max-w-full mx-auto" style={{ backgroundColor: pokemonColors.mainColor }}>
            {/* Primer contenedor con home */}
            <div className="w-full sm:w-[101px] flex justify-start items-center px-4 sm:px-2">
                <img src="/Pokemon .png" alt="Pokemon" className="w-[100px] h-auto object-contain mb-4" />
                <button className="font-bold text-white text-[16px] sm:text-[20px] ml-4 ">Home</button>
            </div>
            
            {/* Segundo contenedor con pokedex */}
            <div className="flex-grow flex justify-center items-center">
                <img
                    src="/International_pokemon_logo.png"
                    alt="Pokemon Logo"
                    className="w-[50%] sm:w-[554px] h-auto object-contain mb-4"
                />
            </div>

            {/* Tercer contenedor con cambiar de universo */}
            <div className="w-full sm:w-[101px] flex justify-end items-center px-4 sm:px-2">
                <button className="font-bold text-white text-[16px] sm:text-[20px] mr-6 mb-4">Cambiar Universo</button>
                <img src='/perfil.png' alt='perfil' className='w-[80px] sm:w-[100px] h-auto object-contain mb-4' />
            </div>
        </div>
    );
}