import Stats from './Stats.png';
import Info from './Info.png';
import Creator from './Creator.png';
import Moves from './Moves.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UniverseType } from '../../../../universe/domain/universe-type';
import { UniverseEntity } from '../../../../universe/domain/universe-entity';
import {
    getCurrentUniverseApplication,
    getUniverseEntityByIdAndTypeApplication,
} from '../../../../../config/app.providers';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants';

export function Data() {
    const { id } = useParams();

    const [universeType, setUniverseType] = useState<UniverseType | undefined>();
    const [universeEntityLoaded, setUniverseEntityLoaded] = useState<boolean>(false);
    const [universeEntity, setUniverseEntity] = useState<UniverseEntity | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!universeType) {
            getCurrentUniverseApplication.exec().then((res) => setUniverseType(res));
        }
    }, [universeType]);

    useEffect(() => {
        if (!universeEntityLoaded && universeType) {
            getUniverseEntityByIdAndTypeApplication
                .exec(id as string, universeType.name)
                .then((res) => {
                    setUniverseEntityLoaded(true);
                    setUniverseEntity(res);
                })
                .catch(() => navigate(RoutesConstants.HOME));
        }
    }, [navigate, universeEntityLoaded, id, universeType]);

    if (universeEntity && universeType) {
        return (
            <section className="w-full mt-4 p-4">
                <p className="w-full mt-4 p-4 text-lg text-center">{universeEntity?.description}</p>

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
    } else if (!universeEntity && !universeEntityLoaded) {
        /* TODO: Add Loader. */
        return <div>Loader Here</div>;
    } else {
        return <>{navigate(RoutesConstants.HOME)}</>;
    }
}
