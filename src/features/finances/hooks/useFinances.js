import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; // Ajusta la ruta según tu estructura de carpetas

export const useFinances = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats] = useState({ total: 0, activos: 0, promedio: 0 });
  const [loading, setLoading] = useState(true);

  const fetchFinanzas = useCallback(async () => {
    try {
      setLoading(true);

      // Traemos las suscripciones incluyendo el nombre y email del usuario asociado (Relación/Join)
      const { data, error } = await supabase
        .from('suscripciones')
        .select(`
          id, 
          tipo_plan, 
          estado, 
          precio, 
          fecha_inicio, 
          fecha_fin, 
          usuarios (nombre, email)
        `)
        .order('fecha_inicio', { ascending: false });

      if (error) throw error;

      const subscriptionsData = data || [];
      setSubscriptions(subscriptionsData);

      // --- CÁLCULO DE MÉTRICAS ---
      
      // 1. Ingresos totales (SÓLO sumamos lo cobrado: recibos y ajustes)
      const total = subscriptionsData
        .filter(s => s.estado === 'recibo_generado' || s.estado === 'recibo')
        .reduce((acc, curr) => acc + (parseFloat(curr.precio) || 0), 0);
      
      // 2. Conteo de suscripciones activas (Gente que tiene permiso de entrada)
      const activos = subscriptionsData.filter(s => s.estado === 'activo').length;
      
      // 3. Ticket medio (Basado en lo que valen tus planes activos)
      const totalActivos = subscriptionsData
        .filter(s => s.estado === 'activo')
        .reduce((acc, curr) => acc + (parseFloat(curr.precio) || 0), 0);

      const promedio = activos > 0 ? (totalActivos / activos).toFixed(2) : 0;

      setStats({ total, activos, promedio });

    } catch (err) {
      console.error("Error al sincronizar datos financieros:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFinanzas();
  }, [fetchFinanzas]);

  return { 
    subscriptions, 
    stats, 
    loading, 
    refresh: fetchFinanzas 
  };
};