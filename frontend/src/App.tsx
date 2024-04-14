import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registro from './components/Register';
import Home from './pages/Home'
import { AuthProvider } from './services/AuthService'; // Importa el proveedor de contexto de autenticación
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <AuthProvider> {
      /* Envuelve la aplicación con el proveedor de contexto de autenticación */
    }
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
