import { JSX, useEffect, useState } from 'react';
import { PokemonInfoTitle } from './pokemon-info-title.tsx';
import { PokemonInfoData } from './pokemon-info-data.tsx';
import { UniverseTypeNameToPropertiesConstants } from '../../../../universe/domain/constants/universe-type-name-to-properties.constants';
import { PokemonInfoEvolution } from './pokemon-info-evolution.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesConstants } from '../../../../shared/domain/constants/routes.constants.ts';
import { useUniverse } from '../../../../../config/universe/use-universe.hook.ts';
import { PokemonDetail } from '../../../domain/pokemon-detail.ts';
import { getPokemonDetailByIdApplication } from '../../../../../config/app.providers.ts';

export default function PokemonInfoPage(): JSX.Element {
    const { id } = useParams();

    const { universeType } = useUniverse();
    const [pokemonLoaded, setPokemonLoaded] = useState<boolean>(false);
    const [pokemon, setPokemon] = useState<PokemonDetail | undefined>();
    const navigate = useNavigate();

    /**
     * Get the universe entity by id and type.
     */
    useEffect(() => {
        if (!pokemonLoaded && universeType) {
            getPokemonDetailByIdApplication
                .exec(Number(id))
                .then((res) => {
                    setPokemonLoaded(true);
                    setPokemon(res);
                })
                .catch(() => navigate(RoutesConstants.HOME));
        }
    }, [navigate, pokemonLoaded, id, universeType]);
    if (universeType && pokemon) {
        return (
            <main
                className="w-full min-h-screen "
                style={{ backgroundColor: UniverseTypeNameToPropertiesConstants.POKEMON.tertiaryColor }}
            >
                <PokemonInfoTitle pokemon={pokemon.pokemon} />
                <div className="h-4"></div>
                <PokemonInfoData pokemon={pokemon.pokemon} pokemonMovement={pokemon.movements} />
                <PokemonInfoEvolution pokemon={pokemon.evolutionChain}/>
            </main>
        );
    } else if (!pokemon && !pokemonLoaded) {
        /* TODO: Add Loader. */
        return <div>Loader Here</div>;
    } else {
        return <>{navigate(RoutesConstants.HOME)}</>;
    }
}
