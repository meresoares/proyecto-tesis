import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Registro from './components/register';
import Home from './pages/home'
import { AuthProvider } from './services/Auth.service'; // Importa el proveedor de contexto de autenticación
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <AuthProvider> {/* Envuelve la aplicación con el proveedor de contexto de autenticación */}
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
