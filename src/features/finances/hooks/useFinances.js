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

      // --- CÁLCULO DE MÉTRICAS (Lógica de Negocio) ---
      
      // 1. Ingresos totales (sumatorio de precios)
      const total = subscriptionsData.reduce((acc, curr) => acc + (parseFloat(curr.precio) || 0), 0);
      
      // 2. Conteo de suscripciones activas
      const activos = subscriptionsData.filter(s => s.estado === 'activo').length;
      
      // 3. Ticket medio (Promedio de ingreso por suscripción activa)
      const promedio = activos > 0 ? (total / activos).toFixed(2) : 0;

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