import { UniverseTypeNameToPropertiesConstants } from '../../../../universe/domain/constants/universe-type-name-to-properties.constants';

export function PokemonInfoEvolution() {
    return (
        <>
            <p className="ml-12 mt-5 font-semibold text-[30px]">Línea evolutiva</p>
            <div
                className="evolutionaryLine h-[350px] m-20 mt-2 ml-10 border-2 rounded-[3vw]"
                style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.secondaryColor }}
            ></div>
        </>
    );
}
