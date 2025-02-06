import { ReactNode } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { RoutesConstants } from "../../../../shared/domain/constants/routes.constants";
import { useNavigate } from "react-router-dom";

export interface PokemonProps {
    pokemonName: string;
    index: number;
    img: string;
    children?: ReactNode;
}

export function Title({ pokemonName, index, img }: PokemonProps) {
    const navigate = useNavigate();
    return (
        <>

            <section 
                className="w-full grid grid-cols-3 md:grid-cols-3 items-center p-4 gap-4"
            >
                <CgArrowLeft size="4rem" className="cursor-pointer" onClick={() => navigate(RoutesConstants.HOME)}
                />

                <p className="text-lg font-semibold text-center">
                    {pokemonName} pok
                </p>

                <p className="text-lg bg-[#ef6bf9] w-32 h-12 flex items-center justify-center font-bold text-white rounded-md justify-self-end m-4">
                    {index}
                </p>
            </section>

            <img 
                src={img} 
                alt={`${pokemonName} image`} 
                className="w-full max-w-[256px] h-auto object-cover mx-auto"
            />
        </>
    );
}
