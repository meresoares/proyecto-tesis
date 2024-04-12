import React, { useState } from 'react';
import registroImage from '../images/img-registro.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../services/Auth.service';
import { Link } from 'react-router-dom';


const Register: React.FC = () => {
    const auth = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false); // Estado para controlar el envío del formulario
    const [successMessage, setSuccessMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    interface AuthError {
        code: string;
        message: string;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Deshabilitar el botón de registro
        setSubmitting(true);

        // Validar la longitud de la contraseña
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            // Habilitar el botón de registro nuevamente
            setSubmitting(false);
            return; // Retorno temprano
        }

        try {
            if (password !== repeatPassword) {
                setError('Las contraseñas no coinciden.');
                return;
            }

            // Llamada al servicio de autenticación para registrar al usuario
            await auth.register(email, password);
            setSuccessMessage('¡Cuenta creada exitosamente!');

            // Limpiar campos después del registro exitoso
            setUsername('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');
            setError('');

        } catch (error) {
            // Manejo de errores
            const authError = error as AuthError;
            if (authError.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else if (authError.code === 'auth/invalid-email') {
                setError('Por favor, introduce una dirección de correo electrónico válida.');
            } else {
                setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
            }
        } finally {
            // Habilitar el botón de registro nuevamente
            setSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await auth.loginWithGoogle();
            // Aquí podrías redirigir al usuario a una página de bienvenida o a su perfil
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            setError('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <section className="text-center text-lg-start">
            <style>
                {`
                    .cascading-right {
                        margin-right: -50px;
                    }

                    @media (max-width: 991.98px) {
                        .cascading-right {
                            margin-right: 0;
                        }
                    }
                `}
            </style>

            <div className="container py-4">
                <div className="row g-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card cascading-right" style={{
                            background: 'hsla(0, 0%, 100%, 0.55)',
                            backdropFilter: 'blur(30px)'
                        }}>
                            <div className="card-body p-5 shadow-5 text-center">
                                <h2 className="fw-bold mb-5">Nuevo registro</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div data-mdb-input-init className="form-outline">
                                                <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                                                <label className="form-label" htmlFor="username">Nombre de usuario</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div data-mdb-input-init className="form-outline">
                                                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label className="form-label" htmlFor="email">Correo electrónico</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type={showPassword ? 'text' : 'password'} id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <label className="form-label" htmlFor="password">Contraseña</label>
                                        <span className="input-group-text position-absolute end-0 top-50 translate-middle-y" style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                                            {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                                        </span>
                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <input type={showPassword ? 'text' : 'password'} id="repeatPassword" className="form-control" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                                        <label className="form-label" htmlFor="repeatPassword">Repetir contraseña</label>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mb-4" disabled={submitting}>
                                        {submitting ? 'Registrando...' : 'Crear cuenta'}
                                    </button>
                                    {successMessage && !error && <div className="alert alert-success mb-3">{successMessage}</div>}
                                    {error && <div className="alert alert-danger mb-3">{error}</div>}


                                    <div className="text-center">
                                        <p>O Regístrate con:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1" onClick={handleGoogleLogin}>
                                            <i className="fab fa-google"></i>
                                        </button>
                                    </div>

                                    <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Ya tienes una cuenta? <Link to="/login" style={{ color: '#393f81' }}>Ingresa aquí</Link></p>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <img src={registroImage} className="w-100 rounded-4 shadow-4" alt="" />
                    </div>

                </div>
            </div>

        </section>
    );
};

export default Register;
