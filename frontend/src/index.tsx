import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { app as firebaseConfig } from './config/firebase.config';

// Inicializa Firebase con la configuración proporcionada
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
firebaseConfig;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
