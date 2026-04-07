import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './config/supabase'; // <-- AÑADIMOS ESTO
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Recuperar sesión y VALIDAR ROL inmediatamente
  useEffect(() => {
    const savedUser = localStorage.getItem('gymUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      
      // Si el usuario en storage NO es admin, lo borramos para evitar bucles
      if (parsedUser.rol?.toLowerCase() === 'admin') {
        setUser(parsedUser);
      } else {
        localStorage.removeItem('gymUser');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    // Solo permitimos el login si es admin
    if (userData.rol?.toLowerCase() === 'admin') {
      setUser(userData);
      localStorage.setItem('gymUser', JSON.stringify(userData));
    } else {
      alert("⛔ Acceso denegado: Este panel es exclusivo para administradores.");
    }
  };

  const handleLogout = async () => { // <-- AHORA ES ASYNC
    // 1. Cerramos la sesión real en el servidor de Supabase
    await supabase.auth.signOut();
    
    // 2. Limpiamos la pantalla y el navegador
    setUser(null);
    localStorage.removeItem('gymUser');
  };

  if (loading) return null;

  // Definimos si el usuario actual es un administrador válido
  const isAdmin = user && user.rol?.toLowerCase() === 'admin';

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={isAdmin ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/dashboard/*" 
          element={isAdmin ? <DashboardPage user={user} logout={handleLogout} /> : <Navigate to="/" replace />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}