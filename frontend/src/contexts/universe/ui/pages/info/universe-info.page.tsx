import { JSX, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { HiPencil } from 'react-icons/hi2';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getCurrentUniverseApplication,
    getUniverseEntityByIdAndTypeApplication,
} from '../../../../../config/app.providers.ts';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { UniverseEntity } from '../../../domain/universe-entity.ts';
import { UniverseType } from '../../../domain/universe-type.ts';

/**
 * The page that displays information about one element of the universe.
 */
export default function UniverseInfoPage(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();

    const [universeType, setUniverseType] = useState<UniverseType | undefined>();

    const [universeEntityLoaded, setUniverseEntityLoaded] = useState<boolean>(false);
    const [universeEntity, setUniverseEntity] = useState<UniverseEntity | undefined>();

    /**
     * Load the universe type when the component is mounted.
     */
    useEffect(() => {
        if (!universeType) {
            getCurrentUniverseApplication.exec().then((res) => setUniverseType(res));
        }
    }, [universeType]);

    /**
     * Load the universe entity when the component is mounted.
     */
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

    if (universeType && universeEntity) {
        return (
            <main
                className="grow w-full flex justify-center items-center"
                style={{ backgroundColor: universeType.tertiaryColor }}
            >
                <div className="flex w-4/5 h-4/5">
                    <div
                        className="w-4/6 rounded-l border-x border-white shadow-2xl shadow-gray-400 overflow-hidden"
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
                                    className="h-4/5 w-4/5 mr-10"
                                    style={{ backgroundColor: universeType.secondaryColor }}
                                ></div>
                            </div>
                            <div className="flex h-1/5 items-center justify-center gap-x-10">
                                <div className="bg-green-300 py-3 px-10">
                                    <p className="font-bold">{universeEntity.name}</p>
                                </div>
                                {universeEntity.allowDetail && universeEntity.detailPath && (
                                    <button className="font-bold">Ver detalles</button>
                                )}
                            </div>
                        </div>
                        <div className="w-full h-1/6 flex items-center justify-end gap-x-10">
                            <HiPencil size="2rem" />
                            <MdDelete size="2.4rem" className="mr-10" />
                        </div>
                    </div>
                    <div className="w-3/6 flex items-center">
                        <div className="w-full h-4/5" style={{ backgroundColor: universeType.mainColor }}></div>
                    </div>
                </div>
            </main>
        );
    } else if (!universeEntity && !universeEntityLoaded) {
        /* TODO: Add Loader. */
        return <div>Loader Here</div>;
    } else {
        return <>{navigate(RoutesConstants.HOME)}</>;
    }
}
