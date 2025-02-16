import { UniverseTypeNameToPropertiesConstants } from '../../../../universe/domain/constants/universe-type-name-to-properties.constants';
import { Pokemon } from '../../../domain/pokemon';

export function PokemonInfoEvolution({ pokemon }: {pokemon : Pokemon[]}) {
    return (
        <>
            <p className="ml-12 mt-5 font-semibold text-[30px]">Línea evolutiva</p>
            <div
                className="evolutionaryLine sm:min-h-auto  m-20 mt-2 ml-10 border-2 rounded-[3vw] flex flex-wrap justify-center items-center gap-5 p-5"
                style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.secondaryColor }}
            >
                {pokemon.map((p) => (
                    <div key={p.id} className="flex flex-col items-center md:flex-row md:space-x-5">
                        <img src={p.frontImageUrl} className="w-24 h-24 object-contain md:w-32 md:h-32" alt={p.name} />
                        <p className="text-lg font-semibold">{p.name[0].toUpperCase() + p.name.substring(1)}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
