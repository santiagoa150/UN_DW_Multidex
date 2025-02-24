import Stats from '../images/Stats.png';
import Info from '../images/Info.png';
import Creator from '../images/Creator.png';
import Moves from '../images/Moves.png';
import { Pokemon } from '../../../domain/pokemon';
import { PokemonMovement } from '../../../domain/pokemon-movement';

export function PokemonInfoData({ pokemon, pokemonMovement }: { pokemon: Pokemon; pokemonMovement: PokemonMovement[] }) {
    return (
        <section className="w-full mt-4 p-4">
            <p className="w-full mt-4 p-4 text-lg text-center">{pokemon.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="p-4">
                    <div className="flex items-center justify-between bg-[#ee9af4] p-4 text-white font-bold text-lg rounded-lg">
                        <img src={Info} className="w-12 h-12" />
                        <span>Información</span>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[20px] bg-[#f7cde9] h-64 rounded-lg pl-4">
                        <p><b>Altura: </b>{pokemon.height}</p>
                        <p><b>Peso: </b>{pokemon.weight}</p>
                        <p><b>Tipos: </b>{pokemon.entityTypes.join(", ")}</p>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between bg-[#ee9af4] p-4 text-white font-bold text-lg rounded-lg">
                        <span>Estadísticas</span>
                        <img src={Stats} className="w-12 h-12" />
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[20px] bg-[#f7cde9] min-h-64 sm:min-h-auto max-h-auto overflow-auto rounded-lg pl-4">
                       
                        <p><b>Velocidad: </b>{pokemon.speed}</p>
                        <p><b>Defensa: </b>{pokemon.defense}</p>
                        <p><b>Ataque: </b>{pokemon.attack}</p>
                        <p><b>Salud: </b>{pokemon.hp}</p>
                        <p><b>Ataque especial: </b>{pokemon.specialAttack}</p>
                        <p><b>Defensa especial: </b>{pokemon.specialDefense}</p>

                    </div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between bg-[#ee9af4] p-4 text-white font-bold text-lg rounded-lg">
                        <img src={Moves} className="w-12 h-12" />
                        <span>Movimientos</span>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[20px] bg-[#f7cde9] 
                                min-h-64 sm:min-h-auto max-h-auto overflow-auto rounded-lg p-4">
                                {pokemonMovement.map((move) => (
                                    <div key={`${move.name}-${move.levelLearnedAt}`} className="p-2 text-center sm:text-left">
                                    {move.name[0].toUpperCase() + move.name.substring(1)}
                                    </div>
                                ))}
                    </div>
                </div>
                {pokemon.creatorName && (
                <div className="p-4">
                    <div className="flex items-center justify-between bg-[#ee9af4] p-4 text-white font-bold text-lg rounded-lg sm:min-h-auto max-h-auto">
                        <span>Creador</span>
                        <img src={Creator} className="w-12 h-12" />
                    </div>
                        <div className="p-4 bg-[#f7cde9] h-64 rounded-lg">
                            {pokemon.creatorName}
                        </div>
                </div>)}
            </div>
        </section>
    );
}
