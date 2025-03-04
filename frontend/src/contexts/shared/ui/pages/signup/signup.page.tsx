import axios from 'axios';
import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConstants } from '../../../domain/constants/routes.constants.ts';
import { BackendUserConstants } from '../../../infrastructure/backend/backend-user.constants.ts';
import Background from '../../images/pokeR&MBackground.png';

export default function SignupPage(): JSX.Element {
    const navigate = useNavigate();
    const backgroundStyle = {
        background: `url(${Background}) no-repeat center`,
        backgroundPosition: '50% 50%',
        backgroundSize: 'auto',
    };

    // State for form inputs
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            /*
            const response = await fetch("https://your-api.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            */
            /*TODO: Probar con nuevo endpoint para signup */
            const response = await axios
                .post(BackendUserConstants.POST_SIGNUP_OPERATION, formData)
                .then((res) => res.data);
            if (response.ok) {
                alert('Usuario creado exitosamente');
                navigate(RoutesConstants.UNIVERSE_LIST);
            } else {
                alert('Error al crear usuario');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Hubo un problema con el registro.');
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center" style={backgroundStyle}>
            <div className="w-[50%] flex flex-col justify-center items-center border border-[#FFFFFF] bg-[rgba(255,255,255,0.4)] rounded-[24px] pb-[2%]">
                <div className="w-[100%] flex flex-row">
                    <div className="flex flex-col w-[50%] justify-center items-center py-[8%] pb-[2%]">
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-id-card-o text-[40px] mr-[3%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-user text-[40px] mr-[6%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="usuario"
                                placeholder="Nombre de usuario"
                                value={formData.usuario}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-lock text-[40px] mr-[7%]"></i>
                            <input
                                type="password"
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-[50%] justify-center items-center py-[8%] pb-[2%]">
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-id-card-o text-[40px] mr-[3%]"></i>
                            <input
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="apellido"
                                placeholder="Apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-envelope text-[40px] mr-[5%]"></i>
                            <input
                                type="email"
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        /*TODO: Agregar validación de confirmPassword */
                        <div className="mx-[5%] flex flex-row items-center mb-[10%]">
                            <i className="fa fa-lock text-[40px] mr-[7%]"></i>
                            <input
                                type="password"
                                className="w-full rounded-[20px] text-[24px] pl-[10%] bg-[#FFF4CE] border border-black"
                                name="confirmPassword"
                                placeholder="Confirmar contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
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
    );
}
