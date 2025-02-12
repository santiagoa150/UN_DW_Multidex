import { JSX, useEffect, useState } from 'react';
import { PokemonInfoTitle } from './pokemon-info-title.tsx';
import { PokemonInfoData } from './pokemon-info-data.tsx';
import { UniverseTypeNameToPropertiesConstants } from '../../../../universe/domain/constants/universe-type-name-to-properties.constants';
import { PokemonInfoEvolution } from './pokemon-info-evolution.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { UniverseEntity } from '../../../../universe/domain/universe-entity.ts';
import { getUniverseEntityByIdAndTypeApplication } from '../../../../../config/app.providers.ts';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';

export default function PokemonInfoPage(): JSX.Element {
    const { id } = useParams();

    const { universeType } = useUniverse();
    const [universeEntityLoaded, setUniverseEntityLoaded] = useState<boolean>(false);
    const [universeEntity, setUniverseEntity] = useState<UniverseEntity | undefined>();
    const navigate = useNavigate();

    /**
     * Get the universe entity by id and type.
     * TODO: Change to pokemon entity.
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
            <main
                className="w-full min-h-screen "
                style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.tertiaryColor }}
            >
                <PokemonInfoTitle pokemon={universeEntity} />
                <div className="h-4"></div>
                <PokemonInfoData pokemon={universeEntity} />
                <PokemonInfoEvolution />
            </main>
        );
    } else if (!universeEntity && !universeEntityLoaded) {
        /* TODO: Add Loader. */
        return <div>Loader Here</div>;
    } else {
        return <>{navigate(RoutesConstants.HOME)}</>;
    }
}
