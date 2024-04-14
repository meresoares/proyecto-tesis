import React from 'react';
import { useAuth, AuthContext } from './AuthService';
import { useNavigate } from 'react-router-dom';

const AuthProvider: React.FC = () => {
    const authService = useAuth();
    // Obtener el contexto de autenticación

    const user = authService?.user ?? null;
    const logout = authService?.logout ?? null;
    const navigate = useNavigate(); // Obtiene el objeto de historial de navegación


    const handleLogout = () => {
        if (logout) {
            logout().then(() => {
                navigate('/login');
            });
        } else {
            console.error("La función de cierre de sesión no está disponible");
        }
    };


    return (
        <div>
            {user ? (
                <div>
                    <p>Usuario autenticado como: {user.email}</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <p>No hay usuario autenticado</p>
            )}
        </div>
    );
};

export default AuthProvider;
