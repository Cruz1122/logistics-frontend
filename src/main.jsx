import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Importa ToastContainer y estilos
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer 
        position="top-right"  // Puedes cambiar a bottom-right, top-center, etc.
        autoClose={3000}      // 3 segundos
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"         // O "dark"
      />
    </BrowserRouter>
  </StrictMode>,
);
