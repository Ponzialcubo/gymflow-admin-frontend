import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase';

export const useSettings = () => {
  // --- 1. ESTADOS DE PERFIL Y APP ---
  const [settings, setSettings] = useState({
    gymName: 'GymFlow Pro Center',
    currency: 'EUR',
    notifications: true,
    darkMode: false
  });
  
  const [profile, setProfile] = useState({ nombre: '', email: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // --- 2. ESTADOS DEL CENTRO (Gym Settings) ---
  const [gymSettings, setGymSettings] = useState({
    aforo_maximo: 100,
    precio_basic: 19.99,
    precio_estandar: 29.99,
    precio_pro: 49.99,
    notificaciones_push: true,
    modo_mantenimiento: false
  });
  const [savingGym, setSavingGym] = useState(false);

  // --- OBTENER ID USUARIO ---
  const getUserId = () => {
    const savedUser = localStorage.getItem('gymUser');
    return savedUser ? JSON.parse(savedUser).id : null;
  };

  // --- CARGA INICIAL BIFURCADA (Perfil + Centro) ---
  const fetchSettingsAndProfile = useCallback(async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      setLoading(true);
      
      // A. Cargar datos del usuario administrador
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

      // B. Cargar ajustes globales del centro
      const { data: gymData, error: gymError } = await supabase
        .from('gym_settings')
        .select('*')
        .eq('id', 1)
        .single();

      // Ignoramos el error si la fila aún no existe (código PGRST116)
      if (gymError && gymError.code !== 'PGRST116') {
        console.error("Error al cargar ajustes del centro:", gymError.message);
      }
      if (gymData) setGymSettings(gymData);

    } catch (err) {
      console.error("Error general al cargar configuración:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettingsAndProfile();
  }, [fetchSettingsAndProfile]);

  // --- FUNCIONES DE PERFIL Y SEGURIDAD ---
  const handleUpdateProfile = async (newData) => {
    const userId = getUserId();
    setMensaje({ texto: '⌛ Actualizando perfil...', tipo: 'info' });
    
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ nombre: newData.nombre, email: newData.email })
        .eq('id', userId);

      if (error) throw error;

      setProfile(prev => ({ ...prev, ...newData }));
      const savedUser = JSON.parse(localStorage.getItem('gymUser'));
      localStorage.setItem('gymUser', JSON.stringify({ ...savedUser, ...newData }));

      setMensaje({ texto: '✅ Perfil actualizado correctamente', tipo: 'success' });
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000);
    } catch (err) {
      setMensaje({ texto: '❌ Error al actualizar: ' + err.message, tipo: 'error' });
    }
  };

  const handleUpdatePassword = async (newPassword) => {
    setMensaje({ texto: '⌛ Actualizando credenciales de seguridad...', tipo: 'info' });

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        setMensaje({ texto: '❌ Error de seguridad: ' + error.message, tipo: 'error' });
        return false;
      }

      setMensaje({ texto: '✅ Contraseña actualizada correctamente', tipo: 'success' });
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
      return true;
    } catch (err) {
      setMensaje({ texto: '❌ Error de seguridad: ' + err.message, tipo: 'error' });
      return false;
    }
  };

  // --- FUNCIONES DEL CENTRO (Gym Settings) ---
  const handleUpdateGymSettings = async (e) => {
    if (e) e.preventDefault(); // Previene recarga si se invoca desde un formulario
    setSavingGym(true);

    try {
      const { error } = await supabase
        .from('gym_settings')
        .update({
          aforo_maximo: gymSettings.aforo_maximo,
          precio_basic: gymSettings.precio_basic,
          precio_estandar: gymSettings.precio_estandar,
          precio_pro: gymSettings.precio_pro,
          notificaciones_push: gymSettings.notificaciones_push,
          modo_mantenimiento: gymSettings.modo_mantenimiento,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (error) throw error;
      
      setMensaje({ texto: '✅ Ajustes del centro guardados con éxito', tipo: 'success' });
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000);
      
    } catch (err) {
      setMensaje({ texto: '❌ Error al guardar ajustes: ' + err.message, tipo: 'error' });
    } finally {
      setSavingGym(false);
    }
  };

  const handleChangeGymSettings = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setGymSettings(prev => ({ ...prev, [e.target.name]: value }));
  };

  return { 
    // Exports originales
    settings, setSettings, profile, loading, mensaje, 
    handleUpdateProfile, handleUpdatePassword, refresh: fetchSettingsAndProfile,
    // Nuevos exports para el Centro
    gymSettings, savingGym, handleUpdateGymSettings, handleChangeGymSettings
  };
};