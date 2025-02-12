import { ReactNode, useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { RoutesConstants } from "../../../../shared/domain/constants/routes.constants";
import { useNavigate, useParams } from "react-router-dom";
import { UniverseType } from "../../../../universe/domain/universe-type";
import { UniverseEntity } from "../../../../universe/domain/universe-entity";
import { getCurrentUniverseApplication, getUniverseEntityByIdAndTypeApplication } from "../../../../../config/app.providers";

export interface PokemonProps {
    pokemonName: string;
    index: number;
    img: string;
    children?: ReactNode;
}

export function Title() {
    
    const { id } = useParams();
    
    const [universeType, setUniverseType] = useState<UniverseType | undefined>();
    const [universeEntityLoaded, setUniverseEntityLoaded] = useState<boolean>(false);
    const [universeEntity, setUniverseEntity] = useState<UniverseEntity | undefined>();
    const navigate = useNavigate()
        
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

    if(universeEntity && universeType){
        return (
            <>

                <section 
                    className="w-full grid grid-cols-3 md:grid-cols-3 items-center p-4 gap-4"
                >
                    <CgArrowLeft size="4rem" className="cursor-pointer" onClick={() => navigate(RoutesConstants.HOME)}
                    />

                    <p className="text-lg font-semibold text-center">
                        {universeEntity?.name} pok
                    </p>

                    <p className="text-lg bg-[#ef6bf9] w-32 h-12 flex items-center justify-center font-bold text-white rounded-md justify-self-end m-4">
                        {universeEntity?.id}
                    </p>
                </section>

                <img 
                    src={universeEntity?.frontImageUrl} 
                    alt={universeEntity?.name} 
                    className="w-full max-w-[256px] h-auto object-cover mx-auto"
                />
            </>
        );
    } else if (!universeEntity && !universeEntityLoaded) {
        /* TODO: Add Loader. */
        return <div>Loader Here</div>;
    } else {
        return <>{navigate(RoutesConstants.HOME)}</>;
    }
}
