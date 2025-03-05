import React, { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';
import Background from '../../images/pokeR&MBackground.png';
import { registerApplication } from '../../../../../config/app.providers.ts';
import { CgArrowLeft } from 'react-icons/cg';

export default function SignupPage(): JSX.Element {
    const navigate = useNavigate();

    // State for form inputs
    const [formData, setFormData] = useState({
        email: '',
        names: '',
        username: '',
        lastNames: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (formData.password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await registerApplication.exec(
                formData.email,
                formData.names,
                formData.username,
                formData.lastNames,
                formData.password,
            );
            if (response) {
                alert('Usuario creado exitosamente');
                navigate(RoutesConstants.LOGIN_PAGE);
            } else {
                alert('Error al crear usuario');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Hubo un problema con el registro.');
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
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col justify-center items-center border border-white bg-[rgba(255,255,255,0.4)] rounded-2xl p-6 sm:p-10">
                    <div className="w-full flex flex-col md:flex-row">
                        <div className="flex flex-col w-full md:w-1/2 justify-center items-center py-6 sm:py-8 pr-4">
                            <div className="w-full flex items-center mb-4">
                                <i className="fa fa-id-card-o text-[40px] mr-[4.5%]"></i>
                                <input
                                    className="w-full rounded-[20px] text-l sm:text-xl p-3 bg-[#FFF4CE] border border-black"
                                    name="names"
                                    placeholder="Nombre"
                                    value={formData.names}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full flex items-center mb-4">
                                <i className="fa fa-user text-[40px] mr-[9%]"></i>
                                <input
                                    className="w-full rounded-[20px]  text-lg sm:text-xl p-3 bg-[#FFF4CE] border border-black"
                                    name="username"
                                    placeholder="Nombre de usuario"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full flex items-center mb-4">
                                <i className="fa fa-lock text-[40px] mr-[9.5%]"></i>
                                <input
                                    type="password"
                                    className="w-full rounded-[20px]  text-lg sm:text-xl p-3 bg-[#FFF4CE] border border-black"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 justify-center items-center py-6 sm:py-8">
                            <div className="w-full flex items-center mb-4">
                                <i className="fa fa-id-card-o text-[40px] mr-[4.5%]"></i>
                                <input
                                    className="w-full rounded-[20px]  text-lg sm:text-xl p-3 bg-[#FFF4CE] border border-black"
                                    name="lastNames"
                                    placeholder="Apellido"
                                    value={formData.lastNames}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full flex items-center mb-4">
                                <i className="fa fa-envelope text-[40px] mr-[6%]"></i>
                                <input
                                    type="email"
                                    className="w-full rounded-[20px]  text-lg sm:text-xl p-3 bg-[#FFF4CE] border border-black"
                                    name="email"
                                    placeholder="Correo electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full flex items-center mb-4">
                                <i className="fa fa-lock text-[40px] mr-[9.5%]"></i>
                                <input
                                    type="password"
                                    className="w-full rounded-[20px]  text-lg sm:text-xl p-3 bg-[#FFF4CE] border border-black"
                                    name="confirmPassword"
                                    placeholder="Confirmar contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[100%] flex flex-row justify-center items-center">
                        <div className="flex flex-col items-center font-[Karla] text-[24px] p">
                            <button
                                className="my-[10%] font-bold font-[Karla] text-[24px] ml-[2%] w-[240px] bg-[#8E6995]"
                                onClick={handleSubmit}
                            >
                                Registrarse
                            </button>
                            <a onClick={() => navigate(RoutesConstants.LOGIN_PAGE)}>Iniciar Sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
