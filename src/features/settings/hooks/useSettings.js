import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useSettings = () => {
  const [settings, setSettings] = useState({
    gymName: 'GymFlow Pro Center',
    currency: 'EUR',
    notifications: true,
    darkMode: false
  });
  const [profile, setProfile] = useState({ nombre: '', email: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    // Aquí cargaríamos los ajustes desde la BD
    const fetchSettings = async () => {
      try {
        setLoading(true);
        // Simulamos carga o conectamos a tu endpoint de config
        // const res = await axios.get(`${API_URL}/config`);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdateProfile = async (data) => {
    setMensaje({ texto: '⌛ Actualizando perfil...', tipo: 'info' });
    try {
      // await axios.put(`${API_URL}/admin/profile`, data);
      setMensaje({ texto: '✅ Perfil actualizado correctamente', tipo: 'success' });
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000);
    } catch (err) {
      setMensaje({ texto: '❌ Error al actualizar', tipo: 'error' });
    }
  };

  return { settings, setSettings, profile, loading, mensaje, handleUpdateProfile };
};