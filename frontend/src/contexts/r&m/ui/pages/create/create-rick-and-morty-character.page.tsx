import { JSX, useState } from 'react';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';
import { CgArrowLeft } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { createRickAndMortyCharacterApplication } from '../../../../../config/app.providers.ts';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';

/**
 * Create Rick and Morty Character Page
 */
export default function CreateRickAndMortyCharacterPage(): JSX.Element {
    const { universeType } = useUniverse();
    const navigate = useNavigate();

    const [frontImageUrl, setFrontImageUrl] = useState<string | undefined>(undefined);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [entityType, setEntityType] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [gender, setGender] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<string | undefined>(undefined);
    const [origin, setOrigin] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);

    /**
     * Handle the save changes button click.
     */
    const handleSaveChanges = () => {
        if (canCreate()) {
            createRickAndMortyCharacterApplication
                .exec(frontImageUrl!, name!, entityType!, status!, gender!, origin!, location!, description!)
                .then(() => navigate(RoutesConstants.UNIVERSE_LIST));
        }
    };

    /**
     * Check if all the required fields are filled.
     */
    const canCreate = () => {
        return (
            !!frontImageUrl &&
            !!name &&
            !!status &&
            !!entityType &&
            !!gender &&
            !!location &&
            !!origin &&
            !!description &&
            isImageLoaded
        );
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
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words resize-none overflow-hidden"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <span className="block text-[24px] font-bold">Nombre</span>
                            <input
                                name="status"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                style={{ backgroundColor: universeType?.secondaryColor }}
                                className="text-lg rounded-lg p-2 border-2 font-semibold border-black w-full max-w-full h-auto min-h-[50px] break-words resize-none overflow-hidden"
                            />
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <button
                                onClick={handleSaveChanges}
                                style={{ backgroundColor: universeType?.mainColor }}
                                disabled={!canCreate()}
                                className={`${canCreate() ? 'hover:shadow-2xl transition duration-300 font-bold' : '!bg-gray-400'}  w-3/6 px-4 py-2 rounded mt-4 mb-4`}
                            >
                                Crear
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
