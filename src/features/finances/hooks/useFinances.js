import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useFinances = () => { // Asegúrate de que 'export' esté aquí
  const [subscriptions, setSubscriptions] = useState([]);
  const [stats, setStats] = useState({ total: 0, activos: 0, promedio: 0 });
  const [loading, setLoading] = useState(true);

  const fetchFinanzas = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/suscripciones`);
      const data = res.data;
      
      setSubscriptions(data);

      // Cálculo de métricas
      const total = data.reduce((acc, curr) => acc + (parseFloat(curr.precio) || 0), 0);
      const activos = data.filter(s => s.estado === 'activo').length;
      const promedio = activos > 0 ? (total / activos).toFixed(2) : 0;

      setStats({ total, activos, promedio });
    } catch (err) {
      console.error("Error financiero:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFinanzas();
  }, [fetchFinanzas]);

  return { subscriptions, stats, loading, refresh: fetchFinanzas };
};