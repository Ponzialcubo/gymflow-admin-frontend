import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useDashboard = () => {
  const [stats, setStats] = useState({ sociosActivos: 0, totalEjercicios: 0, ingresosMensuales: 0 });
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [resStats, resClases] = await Promise.all([
        axios.get(`${API_URL}/dashboard/stats`),
        axios.get(`${API_URL}/clases`)
      ]);
      
      setStats(resStats.data);

      const fechaHoy = new Date().toISOString().split('T')[0]; 
      
      const clasesDeHoy = resClases.data.filter(clase => {
        if (!clase.horario) return true; 
        return clase.horario.startsWith(fechaHoy);
      });

      setClases(clasesDeHoy); 
      
    } catch (err) {
      console.error("Error cargando dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  return { stats, clases, loading, fetchDashboardData };
};