import { useEffect, useState } from 'react';
//import { UniverseTypeNameToPropertiesConstants } from "../../../domain/constants/universe-type-name-to-properties.constants";
import { UniverseType } from '../../../domain/universe-type';
import {
    getCurrentUniverseApplication,
    getUniverseEntityByIdAndTypeApplication,
} from '../../../../../config/app.providers';
import { useNavigate, useParams } from 'react-router-dom';
import { UniverseEntity } from '../../../domain/universe-entity';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants';

export function Data() {
    const [universeType, setUniverseType] = useState<UniverseType | undefined>();
    const { id } = useParams();
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
                .exec(Number(id), universeType.name)
                .then((res) => {
                    setUniverseEntityLoaded(true);
                    setUniverseEntity(res);
                })
                .catch(() => navigate(RoutesConstants.HOME));
        }
    }, [navigate, universeEntityLoaded, id, universeType]);

    if (universeType && universeEntity) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 justify-center">
                    <div className="flex justify-center mb-4 md:mb-0">
                        <img
                            src={universeEntity.frontImageUrl}
                            alt={universeEntity.name}
                            className="w-full max-w-[400px] min-w-[20px] h-auto"
                        />
                    </div>

                    <div className=" flex flex-col">
                        <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Tipo</span>
                            <p
                                style={{ backgroundColor: universeType?.boxEditColor }}
                                className="text-lg rounded-[2vw] flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2"
                            >
                                {universeEntity.entityTypes.join(', ')}
                            </p>
                        </span>

                        <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Hábitat</span>
                            <p
                                style={{ backgroundColor: universeType?.boxEditColor }}
                                className="text-lg rounded-[2vw] flex font-semibold p-2 border-2 border-black w-full max-w-full h-[50px]"
                            >
                                {universeEntity.origin}
                            </p>
                        </span>

                        <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Descripción</span>
                            <p
                                style={{ backgroundColor: universeType?.boxEditColor }}
                                className="text-lg rounded-[2vw] p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words "
                            >
                                {universeEntity.description}
                            </p>
                        </span>

                        <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Modificar imagen</span>
                            <p
                                style={{ backgroundColor: universeType?.boxEditColor }}
                                className="text-lg rounded-[2vw] flex border-2 h-[50px] font-semibold w-full max-w-full border-black"
                            ></p>
                        </span>
                    </div>
                </div>
            </>
        );
    } else if (!universeEntity && !universeEntityLoaded) {
        /* TODO: Add Loader. */
        return <div>Loader Here</div>;
    } else {
        return <>{navigate(RoutesConstants.HOME)}</>;
    }
}
