import { CgArrowLeft } from "react-icons/cg";
import { RoutesConstants } from "../../../../shared/domain/constants/routes.constants";
import { useNavigate } from "react-router-dom";
import { PokemonProps } from "../../../../pokemon/ui/pages/info/Title";



export function Title({index}:PokemonProps){
    const navigate = useNavigate()

    return (
        <>
            <section>
                <CgArrowLeft size="4rem" className="cursor-pointer m-4" onClick={() => navigate(RoutesConstants.HOME)}/>    

                <p className="text-lg bg-[#f6d1e6] w-32 h-12 flex items-center justify-center font-bold text-black rounded-md justify-start ">
                    {index}
                </p>
            
            </section>
        </>
    );
}