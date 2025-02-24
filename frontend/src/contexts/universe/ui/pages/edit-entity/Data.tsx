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
    const [isEditing, setIsEditing] = useState(false);
    const [originalUniverseEntity, setOriginalUniverseEntity] = useState<UniverseEntity | undefined>();
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

    const startEditing = () => {
        setOriginalUniverseEntity(universeEntity); 
        setIsEditing(true); 
    };

    const handleCancel = () => {
        setUniverseEntity(originalUniverseEntity);
        setIsEditing(false); 
    };
    
    if (universeType && universeEntity) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 justify-center">
                    <div className="flex justify-center mb-4 md:mb-0 min-h-[400px] w-full">
                        <img
                            src={universeEntity.frontImageUrl}
                            alt={universeEntity.name}
                            className="w-auto max-w-[400px] h-auto max-h-[400px] object-contain"
                        />
                    </div>

                    <div className=" flex flex-col">
                        <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Tipo</span>
                            <textarea
                                name="entityTypes"
                                value={universeEntity.entityTypes.join(", ")}
                                onChange={(e) =>
                                    setUniverseEntity({
                                        ...universeEntity,
                                        entityTypes: e.target.value.split(',').map(item => item.trim()),
                                    })}
                                disabled={!isEditing}
                                className="text-lg rounded-[2vw] flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 bg-transparent resize-none overflow-hidden"
                            />
                        </span>

                        <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Origen</span>
                            <textarea
                                name="origin"
                                value={universeEntity.origin || ""}
                                onChange={(e) => setUniverseEntity({ ...universeEntity, origin: e.target.value })}
                                disabled={!isEditing}
                                className="text-lg rounded-[2vw] flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 bg-transparent resize-none overflow-hidden"
                            />
                        </span>

                        <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Descripción</span>
                            <textarea
                                name="description"
                                value={universeEntity.description}
                                onChange={(e) => setUniverseEntity({ ...universeEntity, description: e.target.value })}
                                disabled={!isEditing}
                                className="text-lg rounded-[2vw] p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words bg-transparent resize-none overflow-hidden"
                            />
                        </span>

                        <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Modificar imagen</span>
                            <textarea
                                name="frontImageUrl"
                                value={universeEntity.frontImageUrl}
                                onChange={(e) => setUniverseEntity({ ...universeEntity, frontImageUrl: e.target.value })}
                                disabled={!isEditing}
                                className="text-lg rounded-[2vw] p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words bg-transparent resize-none overflow-hidden"
                            />
                        </span>
                                
            {isEditing ? (
                <div className="flex flex-col gap-2">
                <button  onClick={() => setIsEditing(false)} className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600">
                    Guardar cambios
                </button>
                <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded mt-4 hover:bg-gray-600">
                    Cancelar
                </button>
                </div>
            ) : (
                <button
                    onClick={startEditing}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                >
                    Editar
                </button>
                )}
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
