import { JSX, useEffect, useState } from 'react';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';
import { CgArrowLeft } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom';
import {
    editRickAndMortyCharacterApplication,
    getUniverseEntityByIdAndTypeApplication,
} from '../../../../../config/app.providers.ts';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { UniverseEntity } from '../../../../universe/domain/universe-entity.ts';

/**
 * Edit Rick and Morty Character Page
 */
export default function EditRickAndMortyCharacterPage(): JSX.Element {
    const navigate = useNavigate();
    const { universeType } = useUniverse();
    const { id } = useParams();

    const [universeEntityLoaded, setUniverseEntityLoaded] = useState<boolean>(false);
    const [universeEntity, setUniverseEntity] = useState<UniverseEntity | undefined>();

    const [isEditing, setIsEditing] = useState(false);
    const [frontImageUrl, setFrontImageUrl] = useState<string | undefined>(undefined);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [entityType, setEntityType] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [gender, setGender] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<string | undefined>(undefined);
    const [origin, setOrigin] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!universeEntityLoaded && universeType) {
            getUniverseEntityByIdAndTypeApplication
                .exec(Number(id), universeType.name)
                .then((res) => {
                    setUniverseEntityLoaded(true);
                    setUniverseEntity(res);
                    if (res) {
                        setFrontImageUrl(res.frontImageUrl);
                        setName(res.name);
                        setEntityType(res.entityTypes[0]);
                        setStatus(res.status);
                        setGender(res.gender);
                        setLocation(res.location);
                        setOrigin(res.origin);
                        setDescription(res.description);
                    }
                })
                .catch(() => navigate(RoutesConstants.HOME));
        }
    }, [navigate, universeEntityLoaded, id, universeType]);

    const handleSaveChanges = () => {
        if (universeEntity) {
            editRickAndMortyCharacterApplication
                .exec(
                    frontImageUrl && isImageLoaded ? frontImageUrl : universeEntity.frontImageUrl,
                    universeEntity.id,
                    name || universeEntity.name,
                    entityType || universeEntity.entityTypes[0],
                    status || universeEntity.status!,
                    gender || universeEntity.gender!,
                    origin || universeEntity.origin!,
                    location || universeEntity.location!,
                    description || universeEntity.description!,
                )
                .then(() => navigate(RoutesConstants.UNIVERSE_INFO.replace(':id', String(universeEntity.id))));
        }
    };

    return (
        <>
            <main className="grow w-full" style={{ backgroundColor: universeType?.tertiaryColor }}>
                <section>
                    <CgArrowLeft size="4rem" className="cursor-pointer m-4" onClick={() => navigate(-1)} />
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center box-border px-20 gap-x-16">
                    <div className="flex flex-col items-center justify-center mb-4 md:mb-0 min-h-[400px] w-full">
                        <img
                            src={frontImageUrl}
                            id="frontImageUrlInput"
                            alt=""
                            onError={() => setIsImageLoaded(false)}
                            onLoad={() => setIsImageLoaded(true)}
                            className="w-[400px] h-[400px] border border-black object-contain"
                        />
                        <div className="mb-4 w-full">
                            <span className="block text-[24px] font-bold">Imagen</span>
                            <input
                                name="frontImageUrl"
                                value={frontImageUrl}
                                onChange={(e) => {
                                    setIsImageLoaded(false);
                                    setFrontImageUrl(e.target.value);
                                }}
                                disabled={!isEditing}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words resize-none overflow-hidden"
                            />
                        </div>
                    </div>
                    <div className=" flex flex-col">
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Nombre</span>
                            <input
                                name="status"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditing}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Estado</span>
                            <input
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                disabled={!isEditing}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Género</span>
                            <input
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                disabled={!isEditing}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Ubicación</span>
                            <input
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                disabled={!isEditing}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Origen</span>
                            <input
                                name="origin"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                disabled={!isEditing}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Tipo</span>
                            <input
                                name="entityType"
                                value={entityType}
                                onChange={(e) => setEntityType(e.target.value)}
                                disabled={!isEditing}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg flex font-semibold border-2 h-[50px] w-full max-w-full border-black p-2 resize-none overflow-hidden"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Descripción</span>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={!isEditing}
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words resize-none overflow-hidden"
                            />
                        </div>
                        <div className="w-full flex items-center justify-center gap-x-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        style={{ backgroundColor: universeType?.secondaryColor }}
                                        className="hover:shadow-2xl transition duration-300 border border-black font-bold w-3/6 px-4 py-2 rounded mt-4 mb-4"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSaveChanges}
                                        style={{ backgroundColor: universeType?.mainColor }}
                                        className="hover:shadow-2xl transition duration-300 font-bold w-3/6 px-4 py-2 rounded mt-4 mb-4"
                                    >
                                        Guardar
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    style={{ backgroundColor: universeType?.mainColor }}
                                    className="hover:shadow-2xl transition duration-300 font-bold w-3/6 px-4 py-2 rounded mt-4 mb-4"
                                >
                                    Editar
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
