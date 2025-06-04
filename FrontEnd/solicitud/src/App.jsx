// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Solicitudes from './pages/SolicitudesList';
import AgregarSolicitud from './pages/AgregarSolicitud';
import RevisionSolicitudes from './pages/RevisionSolicitudes';
import Inicio from './pages/Inicio';
import Login from './components/Login'; // Asegúrate de importar tu componente Login
import PrivateRoute from './components/PrivateRoute'; // Crea este componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública para el login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={
              <PrivateRoute>
                <Inicio />
              </PrivateRoute>
            } 
          />
          <Route 
            path="inicio" 
            element={
              <PrivateRoute>
                <Inicio />
              </PrivateRoute>
            } 
          />
          <Route 
            path="solicitudes" 
            element={
              <PrivateRoute>
                <Solicitudes />
              </PrivateRoute>
            } 
          />
          <Route 
            path="agregarSolicitud" 
            element={
              <PrivateRoute>
                <AgregarSolicitud />
              </PrivateRoute>
            } 
          />
          <Route 
            path="revisionSolicitudes" 
            element={
              <PrivateRoute>
                <RevisionSolicitudes />
              </PrivateRoute>
            } 
          />
        </Route>
        
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;