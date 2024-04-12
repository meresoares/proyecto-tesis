import React from 'react';
import { useAuth } from '../services/Auth.service';

const Home: React.FC = () => {
    const { currentUser, logout } = useAuth();

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            {currentUser ? (
                <div>
                    <h1>Bienvenido, {currentUser.email}</h1>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <div>
                    <h1>Entraste perra</h1>
                    {/* Aquí puedes colocar el formulario de inicio de sesión */}
                </div>
            )}
        </div>
    );
};

export default Home;
