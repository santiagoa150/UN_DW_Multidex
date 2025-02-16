import { CgArrowLeft } from 'react-icons/cg';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    getCurrentUniverseApplication,
    getUniverseEntityByIdAndTypeApplication,
} from '../../../../../config/app.providers';
import { UniverseType } from '../../../domain/universe-type';
import { UniverseEntity } from '../../../domain/universe-entity';

export function Title() {
    const { id } = useParams();

    const navigate = useNavigate();
    const [universeType, setUniverseType] = useState<UniverseType | undefined>();
    const [universeEntityLoaded, setUniverseEntityLoaded] = useState<boolean>(false);
    const [universeEntity, setUniverseEntity] = useState<UniverseEntity | undefined>();

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

    return (
        <>
            <section>
                <CgArrowLeft
                    size="4rem"
                    className="cursor-pointer m-4"
                    onClick={() => navigate(RoutesConstants.HOME)}
                />

                <p
                    style={{ backgroundColor: universeType?.indexEdit }}
                    className="text-lg w-32 h-12 flex items-center justify-center font-bold text-black rounded-md justify-start "
                >
                    {universeEntity?.id}
                </p>
            </section>
        </>
    );
}
