import { useEffect, useState } from 'react';
import { UniverseType } from '../../../domain/universe-type';
import {
    getCurrentUniverseApplication,
    getUniverseEntityByIdAndTypeApplication,
} from '../../../../../config/app.providers';
import { useNavigate, useParams } from 'react-router-dom';
import { UniverseEntity } from '../../../domain/universe-entity';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants';
import axios from "axios";
import { PokemonMovement } from '../../../../pokemon/domain/pokemon-movement';

export function Data() {
    const [universeType, setUniverseType] = useState<UniverseType | undefined>();
    const { id } = useParams();
    const [universeEntityLoaded, setUniverseEntityLoaded] = useState<boolean>(false);
    const [universeEntity, setUniverseEntity] = useState<UniverseEntity | undefined>();
    const [isEditing, setIsEditing] = useState(false);
    const [originalUniverseEntity, setOriginalUniverseEntity] = useState<UniverseEntity | undefined>();
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");    
    
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
        if (!token) {
            alert("Debes iniciar sesión para editar.");
            return;
        }
        setOriginalUniverseEntity(universeEntity); 
        setIsEditing(true); 
    };

    const handleCancel = () => {
        setUniverseEntity(originalUniverseEntity);
        setIsEditing(false); 
    };

    const pokemonTypes = {
        1: "normal", 2: "fire", 3: "water", 4: "grass", 5: "electric",
        6: "ice", 7: "fighting", 8: "poison", 9: "ground", 10: "flying",
        11: "psychic", 12: "bug", 13: "rock", 14: "ghost", 15: "dragon",
        16: "dark", 17: "steel", 18: "fairy", 19: "stellar", 20: "unknown"
    };
    
    const typeToId = Object.fromEntries(Object.entries(pokemonTypes).map(([id, name]) => [name, Number(id)]));
    
    const handleSaveChanges = async () => {
        if (!token || !universeEntity) {
            console.error("No se puede actualizar sin token o datos");
            return;
        }

        if (universeType && universeType.name == "POKEMON"){

            try {
                const { data: currentData } = await axios.get(
                    `http://localhost:7001/api/pokemon/id?id=${id}`,    
                    { headers: { Authorization: `Bearer ${token}` } }
                );  
                
                const types = Array.isArray(universeEntity.entityTypes)
                ? universeEntity.entityTypes
                    .map(type => typeToId[type])
                    .filter(id => Number.isInteger(id))
                : [];
                
                const hasDuplicates = new Set(types).size !== types.length;
                const movements = Array.isArray(currentData.movements) && currentData.movements.length > 0 ? currentData.movements.map((m: PokemonMovement) => m.name)
                : []

                if (hasDuplicates) {
                alert("No puedes enviar tipos duplicados.");
                return;
                }    

                if (types.length === 0) {
                    alert("Debes seleccionar al menos un tipo válido.");
                    return;
                }

                const updatedData = {
                    id: universeEntity.id, 
                    name: universeEntity.name ?? currentData.evolutionChain[0].name,
                    height: universeEntity.height ?? currentData.evolutionChain[0].heigth,
                    weight:  universeEntity.weight ?? currentData.evolutionChain[0].weight,
                    attack: currentData.evolutionChain[0].attack,
                    defense: currentData.evolutionChain[0].defense,
                    hp: currentData.evolutionChain[0].hp,
                    specialAttack: currentData.evolutionChain[0].specialAttack,
                    specialDefense: currentData.evolutionChain[0].specialDefense,
                    speed: currentData.evolutionChain[0].speed,
                    movements:  movements,
                    origin: universeEntity.origin ?? currentData.origin,
                    description: universeEntity.description ?? currentData.description,
                    frontImageUrl: universeEntity.frontImageUrl ?? currentData.frontImageUrl,
                    types,
                };

                    await axios.patch(
                        `http://localhost:7001/api/pokemon/id?id=${id}`,
                        updatedData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
            
                    console.log("Actualización exitosa");
                    setIsEditing(false);
                } catch (error) {
                    console.error("Error al actualizar:", error);
                }
            }else{
                try {
                    const { data: currentData } = await axios.get(
                        `http://localhost:7001/api/universe/entity/by-id-and-type`,
                        {
                            params: {id, universeType : "RICK_AND_MORTY"},
                            headers: { Authorization: `Bearer ${token}` } }
                    );
        
                const updatedData = {
                    id: universeEntity.id,
                    name: universeEntity.name ?? currentData.name, 
                    status: universeEntity.status ?? currentData.status,
                    gender:  universeEntity.gender ?? currentData.gender,
                    location: universeEntity.location ?? currentData.location,
                    type: String(universeEntity.entityTypes ?? currentData.entityTypes),
                    origin: universeEntity.origin ?? currentData.origin,
                    description: universeEntity.description ?? currentData.description,
                    frontImageUrl: universeEntity.frontImageUrl ?? currentData.frontImageUrl,
                };
    

                    await axios.patch(
                        `http://localhost:7001/api/rick-and-morty/character/id`,
                        updatedData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
            
                    console.log("Actualización exitosa");
                    setIsEditing(false);
                } catch (error) {
                    console.error("Error al actualizar:", error);
                }
            }
            
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

                        {universeType.name == "RICK_AND_MORTY" && <span className="mb-4">
                            <span className="block text-end text-[24px] font-bold">Origen</span>
                            <textarea
                                name="origin"
                                value={universeEntity.origin || ""}
                                onChange={(e) => setUniverseEntity({ ...universeEntity, origin: e.target.value })}
                                disabled={!isEditing}
                                className="text-lg rounded-[2vw] flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 bg-transparent resize-none overflow-hidden"
                            />
                        </span>}

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
                <button  onClick={handleSaveChanges} className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600">
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