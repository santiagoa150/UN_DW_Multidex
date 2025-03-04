import { JSX, useEffect, useState } from 'react';
import { PokemonInfoTitle } from './pokemon-info-title.tsx';
import { PokemonInfoData } from './pokemon-info-data.tsx';
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
        setPokemonLoaded(false);
        if (universeType) {
            getPokemonDetailByIdApplication
                .exec(Number(id))
                .then((res) => {
                    setPokemon(res);
                    setPokemonLoaded(true);
                    window.scroll(0, 0);
                })
                .catch(() => navigate(RoutesConstants.HOME));
        }
    }, [id, universeType, navigate]);

    if (universeType && pokemon) {
        return (
            <main className="w-full min-h-screen " style={{ backgroundColor: universeType.tertiaryColor }}>
                <PokemonInfoTitle pokemon={pokemon.pokemon} universeType={universeType} />
                <div className="h-4"></div>
                <PokemonInfoData
                    universeType={universeType}
                    pokemon={pokemon.pokemon}
                    pokemonMovement={pokemon.movements}
                />
                <PokemonInfoEvolution
                    pokemon={pokemon.pokemon}
                    lineEvolution={pokemon.evolutionChain}
                    universeType={universeType}
                />
            </main>
        );
    } else if (!pokemon && !pokemonLoaded) {
        return <div>Loader Here</div>;
    } else {
        return <>{navigate(RoutesConstants.HOME)}</>;
    }
}
