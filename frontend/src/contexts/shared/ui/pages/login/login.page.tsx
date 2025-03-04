import React, { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';
import Background from '../../images/pokeR&MBackground.png';
import { loginApplication } from '../../../../../config/app.providers.ts';

export default function LoginPage(): JSX.Element {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await loginApplication.exec(loginData.email, loginData.password);
            if (response) {
                alert('Inicio de sesión exitoso');
                navigate(RoutesConstants.HOME);
            } else {
                setError('Usuario o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setError('Error en el servidor. Intente nuevamente.');
        }
    };

    return (
        <div
            className="w-full flex flex-col justify-center items-center"
            style={{ background: `url(${Background}) no-repeat center`, backgroundSize: 'cover' }}
        >
            <div className="w-[24%] flex flex-col justify-center items-center border border-[#FFFFFF] bg-[rgba(255,255,255,0.4)]   rounded-[24px] py-[8%] pb-[2%]">
                <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                    <i className="fa fa-user text-[40px] mr-[6%]"></i>
                    <input
                        type="email"
                        className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                    <i className="fa fa-id-card-o text-[40px] mr-[3%]"></i>
                    <input
                        type="password"
                        className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                        name="password"
                        placeholder="Contraseña"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>

                {error && <p className="text-red-600 text-[18px]">{error}</p>}

                <div className="flex flex-col items-center font-[Karla] text-[24px]">
                    <button
                        className="my-[10%] font-bold font-[Karla] text-[24px] ml-[2%] w-[240px] bg-[#8E6995]"
                        onClick={handleLogin}
                    >
                        Iniciar Sesión
                    </button>
                    <a onClick={() => navigate(RoutesConstants.SIGNUP_PAGE)}>Registro</a>
                </div>
            </div>
        </div>
    );
}
