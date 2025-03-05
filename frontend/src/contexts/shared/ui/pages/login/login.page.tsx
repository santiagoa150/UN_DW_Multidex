import React, { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';
import Background from '../../images/pokeR&MBackground.png';
import { loginApplication } from '../../../../../config/app.providers.ts';
import { CgArrowLeft } from 'react-icons/cg';

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
        <>
            <section className="absolute bg-white rounded-[50%] ml-10 mt-10">
                <CgArrowLeft
                    size="4rem"
                    className="cursor-pointer m-4"
                    onClick={() => navigate(RoutesConstants.HOME)}
                />
            </section>
            <div
                className="w-full flex flex-col justify-center items-center min-h-screen bg-cover bg-center p-4"
                style={{ background: `url(${Background}) no-repeat center`, backgroundSize: 'cover' }}
            >
                <div className="w-full sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-center border border-white bg-[rgba(255,255,255,0.4)] rounded-2xl py-8 sm:py-10 px-6">
                    <div className="w-full flex items-center mb-6">
                        <i className="fa fa-user text-3xl sm:text-4xl mr-[7%]"></i>
                        <input
                            type="email"
                            className="w-full rounded-[20px] text-lg sm:text-xl p-3 bg-[#FFF4CE] border border-black"
                            name="email"
                            placeholder="Email"
                            value={loginData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full flex items-center mb-6">
                        <i className="fa fa-id-card-o text-3xl sm:text-4xl mr-[3%]"></i>
                        <input
                            type="password"
                            className="w-full rounded-[20px] text-lg sm:text-xl p-3 bg-[#FFF4CE] border border-black"
                            name="password"
                            placeholder="Contraseña"
                            value={loginData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <p className="text-red-600 font-bold text-sm sm:text-base">{error}</p>}

                    <div className="flex flex-col items-center font-[Karla] text-lg sm:text-xl w-full">
                        <button
                            className="my-6 font-bold w-full sm:w-60 bg-[#8E6995] rounded-xl p-3 cursor-pointer"
                            onClick={handleLogin}
                        >
                            Iniciar Sesión
                        </button>
                        <a onClick={() => navigate(RoutesConstants.SIGNUP_PAGE)}>Registro</a>
                    </div>
                </div>
            </div>
        </>
    );
}
