import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';
import Background from '../../images/pokeR&MBackground.png';

export default function SignupPage(): JSX.Element {
    const navigate = useNavigate();
    const backgroundStyle = {
        background: `url(${Background}) no-repeat center`,
        backgroundPosition: '50% 50%',
        backgroundSize: 'auto',
    };
    const nombreMessage = 'Nombre';
    const apellidoMessage = 'Apellido';
    const usuarioMessage = 'Nombre de usuario';
    const emailMessage = 'Correo electrónico';
    const passMessage = 'Contraseña';
    const passConMessage = 'Confirmar contraseña';

    return (
        <div className="w-full flex flex-col justify-center items-center" style={backgroundStyle}>
            <div className="w-[50%] flex flex-col justify-center items-center border border-[#FFFFFF] bg-[rgba(255,255,255,0.4)] rounded-[24px] pb-[2%]">
                <div className="w-[100%] flex flex-row">
                    <div className="flex flex-col w-[50%] justify-center items-center py-[8%] pb-[2%]">
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-id-card-o text-[40px] mr-[3%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="signup-input"
                                defaultValue={nombreMessage}
                            />
                        </div>
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-user text-[40px] mr-[6%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="signup-input"
                                defaultValue={usuarioMessage}
                            />
                        </div>
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-lock text-[40px] mr-[7%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="signup-input"
                                defaultValue={passMessage}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-[50%] justify-center items-center py-[8%] pb-[2%]">
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-id-card-o text-[40px] mr-[3%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="signup-input"
                                defaultValue={apellidoMessage}
                            />
                        </div>
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-envelope text-[40px] mr-[5%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="signup-input"
                                defaultValue={emailMessage}
                            />
                        </div>
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-lock text-[40px] mr-[7%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="signup-input"
                                defaultValue={passConMessage}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[100%] flex flex-row justify-center items-center">
                    <div className="flex flex-col items-center font-[Karla] text-[24px] p">
                        <button
                            className="my-[10%] font-bold font-[Karla] text-[24px] ml-[2%] w-[240px] bg-[#8E6995]"
                            onClick={() => navigate(RoutesConstants.UNIVERSE_LIST)}
                        >
                            Registrarse
                        </button>
                        <a onClick={() => navigate(RoutesConstants.LOGIN_PAGE)}>Iniciar Sesión</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
