import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase';

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

  // Obtenemos el ID del usuario actual desde el almacenamiento local
  const getUserId = () => {
    const savedUser = localStorage.getItem('gymUser');
    return savedUser ? JSON.parse(savedUser).id : null;
  };

  const fetchSettingsAndProfile = useCallback(async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      setLoading(true);
      
      // 1. Cargamos el perfil del usuario (Admin)
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('nombre, email')
        .eq('id', userId)
        .single();

      if (userError) throw userError;
      setProfile({ 
        nombre: userData.nombre, 
        email: userData.email, 
        avatar: `https://ui-avatars.com/api/?name=${userData.nombre}&background=0D8ABC&color=fff` 
      });

      // 2. Aquí podrías cargar una tabla 'configuracion' si la creas en Supabase
      // Por ahora mantenemos los defaults de la App
      
    } catch (err) {
      console.error("Error al cargar configuración:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettingsAndProfile();
  }, [fetchSettingsAndProfile]);

  const handleUpdateProfile = async (newData) => {
    const userId = getUserId();
    setMensaje({ texto: '⌛ Actualizando perfil en la nube...', tipo: 'info' });
    
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({
          nombre: newData.nombre,
          email: newData.email
        })
        .eq('id', userId);

      if (error) throw error;

      // Actualizamos el estado local y el localStorage para que el nombre cambie en toda la App
      setProfile(prev => ({ ...prev, ...newData }));
      
      const savedUser = JSON.parse(localStorage.getItem('gymUser'));
      localStorage.setItem('gymUser', JSON.stringify({ ...savedUser, ...newData }));

      setMensaje({ texto: '✅ Perfil actualizado correctamente', tipo: 'success' });
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000);
      
    } catch (err) {
      setMensaje({ texto: '❌ Error al actualizar: ' + err.message, tipo: 'error' });
    }
  };

  return { 
    settings, 
    setSettings, 
    profile, 
    loading, 
    mensaje, 
    handleUpdateProfile,
    refresh: fetchSettingsAndProfile 
  };
};