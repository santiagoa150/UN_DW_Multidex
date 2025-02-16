import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';
import Background from '../../images/pokeR&MBackground.png';

export default function LoginPage(): JSX.Element {
    // return <p>Login Page</p>;
    const navigate = useNavigate();
    const backgroundStyle = {
        background: `url(${Background}) no-repeat center`,
        backgroundPosition: '50% 50%',
        backgroundSize: 'auto',
    };
    const usuarioMessage = 'Usuario';
    const contrasenaMessage = 'Contraseña';

    return (
        <div className="w-full flex flex-col justify-center items-center" style={backgroundStyle}>
            <div className="w-[24%] flex flex-col justify-center items-center border border-[#FFFFFF] bg-[rgba(255,255,255,0.4)]   rounded-[24px] py-[8%] pb-[2%]">
                <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                    <i className="fa fa-user text-[40px] mr-[6%]"></i>
                    <input
                        className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                        name="login-input"
                        defaultValue={usuarioMessage}
                    />
                </div>
                <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                    <i className="fa fa-id-card-o text-[40px] mr-[3%]"></i>
                    <input
                        className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                        name="login-input"
                        defaultValue={contrasenaMessage}
                    />
                </div>
                <div className="flex flex-col items-center font-[Karla] text-[24px]">
                    <button
                        className="my-[10%] font-bold font-[Karla] text-[24px] ml-[2%] w-[240px] bg-[#8E6995]"
                        onClick={() => navigate(RoutesConstants.UNIVERSE_LIST)}
                    >
                        Iniciar Sesión
                    </button>
                    <a onClick={() => navigate(RoutesConstants.SIGNUP_PAGE)}>Registro</a>
                </div>
            </div>
        </div>
    );
}
