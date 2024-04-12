import React from 'react';
import { useAuth } from '../services/Auth.service';

const AuthState: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
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

export default AuthState;
