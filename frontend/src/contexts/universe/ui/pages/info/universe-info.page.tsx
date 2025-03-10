import { JSX, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { HiPencil } from 'react-icons/hi2';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { getUniverseEntityByIdAndTypeApplication } from '../../../../../config/app.providers.ts';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { UniverseEntity } from '../../../domain/universe-entity.ts';
import Triangle from '../../images/triangle.png';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';
import { SharedStorageConstants } from '../../../../shared/domain/constants/shared-storage.constants.ts';
import DeleteUniverseEntityModalComponent from '../../components/delete-entity-modal/delete-universe-entity-modal.component.tsx';

/**
 * The page that displays information about one element of the universe.
 */
export default function UniverseInfoPage(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();

    const { universeType } = useUniverse();
    const [universeEntityLoaded, setUniverseEntityLoaded] = useState<boolean>(false);
    const [universeEntity, setUniverseEntity] = useState<UniverseEntity | undefined>();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const tokenData:
        | {
              userId: string;
          }
        | undefined = localStorage.getItem(SharedStorageConstants.AUTH_TOKEN)
        ? JSON.parse(atob(localStorage.getItem(SharedStorageConstants.AUTH_TOKEN)?.split('.')[1] || '{}'))
        : undefined;

    /**
     * Load the universe entity when the component is mounted.
     */
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
                {isModalOpen && (
                    <DeleteUniverseEntityModalComponent
                        universeType={universeType}
                        id={universeEntity.id}
                        name={universeEntity.name.charAt(0).toUpperCase() + universeEntity.name.slice(1)}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
                <main
                    className="grow w-full flex justify-center items-center"
                    style={{ backgroundColor: universeType.tertiaryColor }}
                >
                    <div className="flex flex-col items-center justify-center lg:flex-row w-[95%] h-[90%] lg:h-4/5 lg:w-4/5">
                        <div
                            className="lg:w-7/12 h-4/6 lg:h-full rounded-l border-x border-white shadow-2xl shadow-gray-400 overflow-hidden"
                            style={{ backgroundColor: universeType.mainColor }}
                        >
                            <div className="w-full h-1/6 border-b border-black flex gap-x-10">
                                <div className="h-full flex items-center ml-10">
                                    <CgClose
                                        size="3rem"
                                        className="cursor-pointer"
                                        onClick={() => navigate(RoutesConstants.UNIVERSE_LIST)}
                                    />
                                </div>
                                <div className="flex gap-x-8 mt-5">
                                    <div className="w-[20px] h-[20px] bg-amber-200 rounded-[50%]"></div>
                                    <div className="w-[20px] h-[20px] bg-green-300 rounded-[50%]"></div>
                                </div>
                            </div>
                            <div className="w-full h-4/6 flex justify-center flex-col">
                                <div className="h-4/5 w-full flex items-center justify-end">
                                    <div
                                        className="flex h-4/5 w-5/6 mr-10 items-center text-xs 2xl:text-xl"
                                        style={{ backgroundColor: universeType.secondaryColor }}
                                    >
                                        <div className="w-1/2 h-full box-border p-5 flex flex-col justify-center">
                                            <div className=" flex gap-x-2 text-lg">
                                                <p className="font-bold">{`Tipo${universeEntity.entityTypes.length > 1 ? 's' : ''}:`}</p>
                                                <p>
                                                    {universeEntity.entityTypes
                                                        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                                                        .join(', ')}
                                                </p>
                                            </div>
                                            {universeEntity.height !== undefined && (
                                                <div className=" flex gap-x-2 text-lg">
                                                    <p className="font-bold">Altura:</p>
                                                    <p>{`${universeEntity.height} m`}</p>
                                                </div>
                                            )}
                                            {universeEntity.weight !== undefined && (
                                                <div className=" flex gap-x-2 text-lg">
                                                    <p className="font-bold">Peso:</p>
                                                    <p>{`${universeEntity.weight} kg`}</p>
                                                </div>
                                            )}
                                            {universeEntity.status && (
                                                <div className=" flex gap-x-2 text-lg">
                                                    <p className="font-bold">Estado:</p>
                                                    <p>{universeEntity.status}</p>
                                                </div>
                                            )}
                                            {universeEntity.gender && (
                                                <div className=" flex gap-x-2 text-lg">
                                                    <p className="font-bold">Género:</p>
                                                    <p>{universeEntity.gender}</p>
                                                </div>
                                            )}
                                            {universeEntity.location && (
                                                <div className=" flex gap-x-2 text-lg">
                                                    <p className="font-bold">Ubicación:</p>
                                                    <p>{universeEntity.location}</p>
                                                </div>
                                            )}
                                            {universeEntity.origin && (
                                                <div className=" flex gap-x-2 text-lg">
                                                    <p className="font-bold">Origen:</p>
                                                    <p>{universeEntity.origin}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="h-4/5 w-[1px] bg-white"></div>
                                        <div className="w-1/2 flex flex-col items-center justify-center gap-y-2">
                                            <img
                                                className="w-3/5"
                                                src={universeEntity.frontImageUrl}
                                                alt={universeEntity.name}
                                            />
                                            <p className=" font-bold">
                                                {universeEntity.id.toString().padStart(4, '0')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-1/5 items-center justify-center gap-x-10">
                                    <div className="bg-green-300 py-3 px-10">
                                        <p className="font-bold">
                                            {universeEntity.name.charAt(0).toUpperCase() + universeEntity.name.slice(1)}
                                        </p>
                                    </div>
                                    {universeType.allowDetail && universeType.detailPath && (
                                        <button
                                            className="font-bold py-3 px-10 cursor-pointer rounded-lg hover:shadow-xl transition delay-0 duration-300"
                                            style={{ backgroundColor: universeType.secondaryColor }}
                                            onClick={() =>
                                                navigate(
                                                    universeType.detailPath!.replace(
                                                        ':id',
                                                        universeEntity.id.toString(),
                                                    ),
                                                )
                                            }
                                        >
                                            Ver detalles
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="w-full h-1/6 flex items-center justify-end gap-x-10">
                                {tokenData && tokenData.userId && tokenData.userId == universeEntity.creatorId && (
                                    <>
                                        <HiPencil
                                            className="cursor-pointer"
                                            size="2rem"
                                            onClick={() =>
                                                navigate(
                                                    universeType?.editPath.replace(':id', String(universeEntity.id)),
                                                )
                                            }
                                        />
                                        <MdDelete
                                            size="2.4rem"
                                            className="mr-10 cursor-pointer"
                                            onClick={() => setIsModalOpen(true)}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="lg:w-5/12 h-3/6 lg:h-full flex items-center">
                            <div
                                className="w-full h-4/5 flex items-center justify-center flex-col"
                                style={{ backgroundColor: universeType.mainColor }}
                            >
                                <div className="w-full h-1/6"></div>
                                <div
                                    className="w-4/5 h-3/6 flex items-center box-border p-10"
                                    style={{ backgroundColor: universeType.secondaryColor }}
                                >
                                    <p className=" lg:text-xl">{universeEntity.description}</p>
                                </div>
                                <div className="w-full h-1/6"></div>
                                <div className="w-full h-1/6 flex justify-around items-center">
                                    <div className="w-1/5"></div>
                                    <div className="h-full w-3/6 flex items-end gap-x-5">
                                        <div className="h-4/5 w-[2px] bg-black"></div>
                                        <div className="h-3/5 w-[2px] bg-black"></div>
                                    </div>
                                    <div className="w-1/12 lg:w-1/5">
                                        <img className="w-full" src={Triangle} alt="Triangle" />
                                    </div>
                                    <div className="w-1/5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    } else if (!universeEntity && !universeEntityLoaded) {
        return <div>Loader Here</div>;
    } else {
        return <>{navigate(RoutesConstants.HOME)}</>;
    }
}
