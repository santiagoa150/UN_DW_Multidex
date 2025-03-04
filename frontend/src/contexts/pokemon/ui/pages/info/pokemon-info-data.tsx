import Stats from '../images/Stats.png';
import Info from '../images/Info.png';
import Creator from '../images/Creator.png';
import Moves from '../images/Moves.png';
import { Pokemon } from '../../../domain/pokemon';
import { PokemonMovement } from '../../../domain/pokemon-movement';
import { UniverseType } from '../../../../universe/domain/universe-type.ts';

export function PokemonInfoData({
    universeType,
    pokemon,
    pokemonMovement,
}: {
    universeType: UniverseType;
    pokemon: Pokemon;
    pokemonMovement: PokemonMovement[];
}) {
    return (
        <section className="w-full mt-4 p-4">
            <p className="w-full mt-4 p-4 text-lg text-center">{pokemon.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="p-4">
                    <div
                        className="flex items-center justify-between p-4 text-white font-bold text-lg rounded-lg"
                        style={{ backgroundColor: universeType.mainColor }}
                    >
                        <span>Información</span>
                        <img src={Info} className="w-12 h-12" />
                    </div>
                    <div
                        className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[20px] h-64 rounded-lg pl-4"
                        style={{ backgroundColor: universeType.secondaryColor }}
                    >
                        <p>
                            <b>Altura: </b>
                            {pokemon.height}
                        </p>
                        <p>
                            <b>Peso: </b>
                            {pokemon.weight}
                        </p>
                        <p>
                            <b>Tipos: </b>
                            {pokemon.entityTypes.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
                        </p>
                    </div>
                </div>

                <div className="p-4">
                    <div
                        className="flex items-center justify-between p-4 text-white font-bold text-lg rounded-lg"
                        style={{ backgroundColor: universeType.mainColor }}
                    >
                        <span>Estadísticas</span>
                        <img src={Stats} className="w-12 h-12" alt="" />
                    </div>
                    <div
                        className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[20px] min-h-64 sm:min-h-auto max-h-auto overflow-auto rounded-lg pl-4"
                        style={{ backgroundColor: universeType.secondaryColor }}
                    >
                        <p>
                            <b>Velocidad: </b>
                            {pokemon.speed}
                        </p>
                        <p>
                            <b>Defensa: </b>
                            {pokemon.defense}
                        </p>
                        <p>
                            <b>Ataque: </b>
                            {pokemon.attack}
                        </p>
                        <p>
                            <b>Salud: </b>
                            {pokemon.hp}
                        </p>
                        <p>
                            <b>Ataque especial: </b>
                            {pokemon.specialAttack}
                        </p>
                        <p>
                            <b>Defensa especial: </b>
                            {pokemon.specialDefense}
                        </p>
                    </div>
                </div>
                {pokemon.creatorId && (
                    <div className="p-4 sm:col-span-2">
                        <div
                            className="flex items-center justify-between p-4 text-white font-bold text-lg rounded-lg sm:min-h-auto max-h-auto"
                            style={{ backgroundColor: universeType.mainColor }}
                        >
                            <span>Creador</span>
                            <img src={Creator} className="w-12 h-12" alt="" />
                        </div>
                        <div
                            className="p-4 font-bold rounded-lg"
                            style={{ backgroundColor: universeType.secondaryColor }}
                        >
                            {pokemon.creatorName}
                        </div>
                    </div>
                )}
                <div className="p-4 sm:col-span-2">
                    <div
                        className="flex items-center justify-between p-4 text-white font-bold text-lg rounded-lg"
                        style={{ backgroundColor: universeType.mainColor }}
                    >
                        <span>Movimientos</span>
                        <img src={Moves} className="w-12 h-12" alt="" />
                    </div>
                    <div
                        className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[20px]
                                min-h-64 sm:min-h-auto max-h-auto overflow-auto rounded-lg"
                        style={{ backgroundColor: universeType.secondaryColor }}
                    >
                        {pokemonMovement.map((move) => (
                            <div key={`${move.name}-${move.levelLearnedAt}`} className="p-2 text-center sm:text-left">
                                {move.name[0].toUpperCase() + move.name.substring(1)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
