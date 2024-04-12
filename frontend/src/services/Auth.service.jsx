import { createContext, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error("Error al obtener el contexto de autenticación");
    }
    return context;
};

export function AuthProvider({ children }) {
    const auth = getAuth();

    const [user, setUser] = useState(null);
    // Estado para almacenar la información del usuario autenticado

    const register = async (email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            setUser(response.user); // Actualiza el estado del usuario autenticado
            console.log("Usuario registrado:", response.user);
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            setUser(response.user); // Actualiza el estado del usuario autenticado
            console.log("Usuario logueado:", response.user);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const response = await signInWithPopup(auth, provider);
            setUser(response.user); // Actualiza el estado del usuario autenticado
            console.log("Usuario logueado con Google:", response.user);
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Actualiza el estado del usuario autenticado a null al desconectar
            console.log("Usuario desconectado");
        } catch (error) {
            console.error("Error al desconectar usuario:", error);
            throw error;
        }
    };

    return <AuthContext.Provider value={{ user, register, login, loginWithGoogle, logout }}>{children}</AuthContext.Provider>;
}
