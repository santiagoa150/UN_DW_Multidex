import { CgArrowLeft } from 'react-icons/cg';
import { UniverseEntity } from '../../../../universe/domain/universe-entity.ts';
import { useNavigate } from 'react-router-dom';

export function PokemonInfoTitle({ pokemon }: { pokemon: UniverseEntity }) {
    const navigate = useNavigate();

    return (
        <>
            <section className="w-full grid grid-cols-3 md:grid-cols-3 items-center p-4 gap-4">
                <CgArrowLeft size="4rem" className="cursor-pointer" onClick={() => navigate(-1)} />

                <p className="text-lg font-semibold text-center">{pokemon.name} pok</p>

                <p className="text-lg bg-[#ef6bf9] w-32 h-12 flex items-center justify-center font-bold text-white rounded-md justify-self-end m-4">
                    {pokemon.id}
                </p>
            </section>

            <img
                src={pokemon.frontImageUrl}
                alt={pokemon.name}
                className="w-full max-w-[256px] h-auto object-cover mx-auto"
            />
        </>
    );
}
