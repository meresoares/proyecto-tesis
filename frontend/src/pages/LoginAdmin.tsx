import React, { useState } from 'react';
import loginImage from '../images/img-login.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Importa useHistory desde react-router-dom



const LoginAdmin: React.FC = () => {
    const { login } = useAuth() as { login: (email: string, password: string) => Promise<void> };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate(); // Obtiene el objeto de historial de navegación

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError('');
            if (!isEmailValid(email)) {
                throw new Error('Por favor, introduce una dirección de correo electrónico válida.');
            }
            if (!isPasswordValid(password)) {
                throw new Error('Por favor introduce una contraseña válida.');
            }
            await login(email, password);
            navigate('/administrador'); // Redirige al usuario a la página de inicio después de iniciar sesión correctamente
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Un error desconocido ocurrió.');
            }
        }
    };

    // Función para validar si una cadena de texto cumple con el formato de un correo electrónico válido.
    const isEmailValid = (email: string) => {
        // Expresión regular que verifica si la cadena contiene un formato de correo electrónico válido.
        // El formato válido debe tener al menos un carácter antes y después del símbolo '@', seguido de un punto y al menos un carácter más después del punto.
        return /\S+@\S+\.\S+/.test(email);
    };


    const isPasswordValid = (password: string) => {
        return password.length >= 6; // Por ejemplo, aquí validamos que la contraseña tenga al menos 6 caracteres
    };



    return (
        <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={loginImage} alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleLogin}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <span className="h1 fw-bold mb-0">¡Bienvenido Admin!</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Iniciar sesión</h5>
                                            {error && <div className="alert alert-danger mb-3">{error}</div>}
                                            <div className="form-outline mb-4">
                                                <input type="email" id="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label className="form-label" htmlFor="email">Correo electrónico</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type={showPassword ? 'text' : 'password'} id="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <label className="form-label" htmlFor="password">Contraseña</label>
                                                <span className="input-group-text position-absolute end-0 top-50 translate-middle-y" style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                                                    {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                                </span>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-lg btn-block" type="submit">Acceder</button>
                                            </div>

                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>No tienes aún una cuenta? <Link to="/registro" style={{ color: '#393f81' }}>Registrate aquí</Link></p>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginAdmin;
