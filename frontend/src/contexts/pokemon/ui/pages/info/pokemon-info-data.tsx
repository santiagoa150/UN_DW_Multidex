import Stats from '../images/Stats.png';
import Info from '../images/Info.png';
import Creator from '../images/Creator.png';
import Moves from '../images/Moves.png';
import { UniverseEntity } from '../../../../universe/domain/universe-entity';

export function PokemonInfoData({ pokemon }: { pokemon: UniverseEntity }) {
    return (
        <section className="w-full mt-4 p-4">
            <p className="w-full mt-4 p-4 text-lg text-center">{pokemon?.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="p-4">
                    <div className="flex items-center justify-between bg-[#ee9af4] p-4 text-white font-bold text-lg rounded-lg">
                        <img src={Info} className="w-12 h-12" />
                        <span>Información</span>
                    </div>
                    <div className="bg-[#f7cde9] h-64 rounded-lg"></div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between bg-[#ee9af4] p-4 text-white font-bold text-lg rounded-lg">
                        <span>Estadísticas</span>
                        <img src={Stats} className="w-12 h-12" />
                    </div>
                    <div className="bg-[#f7cde9] h-64 rounded-lg"></div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between bg-[#ee9af4] p-4 text-white font-bold text-lg rounded-lg">
                        <img src={Moves} className="w-12 h-12" />
                        <span>Movimientos</span>
                    </div>
                    <div className="bg-[#f7cde9] h-64 rounded-lg"></div>
                </div>

                <div className="p-4">
                    <div className="flex items-center justify-between bg-[#ee9af4] p-4 text-white font-bold text-lg rounded-lg">
                        <span>Creador</span>
                        <img src={Creator} className="w-12 h-12" />
                    </div>
                    <div className="bg-[#f7cde9] h-64 rounded-lg"></div>
                </div>
            </div>
        </section>
    );
}
