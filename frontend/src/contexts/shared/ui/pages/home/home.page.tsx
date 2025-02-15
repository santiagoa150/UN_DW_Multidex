import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';

export default function HomePage(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center p-[1%]">
                <h1 className="text-[48px] font-[Mansalva]">Multipokedex</h1>
                <div className="flex justify-end w-1/2">
                    <button
                        className="font-[Karla] text-[24px] font-semibold rounded-[15px] w-[240px] bg-[#FEEAEA] border-2 border-black"
                        onClick={() => navigate(RoutesConstants.LOGIN_PAGE)}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        className="font-[Karla] text-[24px] font-semibold ml-[2%] rounded-[15px] w-[240px] bg-[#FEEAEA] border-2 border-black"
                        onClick={() => navigate(RoutesConstants.SIGNUP_PAGE)}
                    >
                        Registrarse
                    </button>
                </div>
            </div>
            <div className="font-[Mansalva] text-[64px] font-bold text-center my-[4%] mb-[5%]">
                <h1>
                    Bienvenido a los Multiversos
                </h1>
                <h1>
                    Rick and Morty x Pokémon
                </h1>
            </div>
            <p className="font-[Mallanna] text-[28px] px-[10%]">
                Explora dos mundos fascinantes en un solo lugar. Viaja a través de portales interdimensionaels al caótico
                y divertido universo de Rick and Morty, o sumérgete en aventuras llenas de criaturas increíbles en el
                maravilloso mundo Pokémon. ¡Elige tu lado y vive la experiencia definitiva!
            </p>
            <div className="flex justify-center my-[3%]">
                <button
                        className="font-[Karla] text-[24px] font-semibold rounded-[15px] w-[240px] bg-[#FEEAEA] border-2 border-black"
                        onClick={() => navigate(RoutesConstants.UNIVERSE_LIST)}
                    >
                    ¡Vamos a explorar!
                </button>
            </div>
            <div className="absolute bottom-0 flex w-full justify-end">
                <i className="fa fa-github text-[80px] mx-[1%]"></i>
                <i className="fa fa-linkedin-square text-[80px] mx-[1%]"></i>
            </div>
        </div>
    );
}
