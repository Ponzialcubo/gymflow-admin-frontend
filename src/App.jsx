import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Efecto para recuperar la sesión al cargar la app
  useEffect(() => {
    const savedUser = localStorage.getItem('gymUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('gymUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gymUser');
  };

  if (loading) return null; // O un spinner de carga profesional

  return (
    <BrowserRouter>
      <Routes>
        {/* Si ya hay usuario, "/" redirige a dashboard automáticamente */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} 
        />

        {/* Ruta Protegida: Si no hay usuario, redirige a login */}
        <Route 
          path="/dashboard/*" 
          element={user ? <DashboardPage user={user} logout={handleLogout} /> : <Navigate to="/" />} 
        />

        {/* Comodín para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}