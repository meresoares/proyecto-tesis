import { createContext, ReactNode, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";

// Definir el tipo de contexto para AuthService
interface AuthService {
    user: User | null;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

// Crear el contexto de autenticación
export const AuthContext = createContext<AuthService | null>(null);

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

// Componente proveedor de autenticación
export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const auth = getAuth();

    const [user, setUser] = useState<User | null>(null);

    const register = async (email: string, password: string): Promise<void> => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            setUser(response.user);
            console.log("Usuario registrado:", response.user);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error al registrar usuario:", error.message);
                throw error;
            } else {
                console.error("Error al registrar usuario:", error);
                throw new Error("Ocurrió un error al registrar el usuario.");
            }
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            setUser(response.user);
            console.log("Usuario logueado:", response.user);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error al iniciar sesión:", error.message);
                throw error;
            } else {
                console.error("Error al iniciar sesión:", error);
                throw new Error("Ocurrió un error al iniciar sesión.");
            }
        }
    };

    const loginWithGoogle = async (): Promise<void> => {
        try {
            const provider = new GoogleAuthProvider();
            const response = await signInWithPopup(auth, provider);
            setUser(response.user);
            console.log("Usuario logueado con Google:", response.user);
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            throw error;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await signOut(auth);
            setUser(null);
            console.log("Usuario desconectado");
        } catch (error) {
            console.error("Error al desconectar usuario:", error);
            throw error;
        }
    };

    // Devuelve el componente con el proveedor y su valor
    return (
        <AuthContext.Provider value={{ user, register, login, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
