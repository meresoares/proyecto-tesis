import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registro from './pages/Register';
import Home from './pages/Home'
import LoginAdmin from './pages/LoginAdmin';
import { AuthProvider } from './services/AuthService'; // Importa el proveedor de contexto de autenticación
import '@fortawesome/fontawesome-free/css/all.css';
import LoginUser from './pages/LoginUser';

function App() {
  return (
    <AuthProvider> {
      /* Envuelve la aplicación con el proveedor de contexto de autenticación */
    }
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login-user" element={<LoginUser />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
