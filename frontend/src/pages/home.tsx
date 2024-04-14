import React, { useEffect } from 'react';
import { useAuth } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const authService = useAuth();
    const user = authService?.user ?? null;
    const logout = authService?.logout ?? (() => console.error("La función de cierre de sesión no está disponible"));

    const navigate = useNavigate(); // Obtiene el objeto de historial de navegación

    useEffect(() => {
        // Verificar si el usuario no está autenticado y redirigir a la página de inicio de sesión
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    const handleLogout = async () => {
        try {
            await logout(); // Cerrar sesión
            navigate('/login', { replace: true }); // Redirigir al usuario a la página de inicio de sesión y reemplazar la entrada actual en el historial
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
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

export default Home;
