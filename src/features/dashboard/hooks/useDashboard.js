import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; // Asegúrate de la ruta correcta

export const useDashboard = () => {
  // Inicializamos stats con la estructura que espera tu StatsGrid
  const [stats, setStats] = useState({ 
    sociosActivos: 0, 
    totalEjercicios: 0, 
    ingresosMensuales: 0,
    desglosePlanes: {},
    alertasCaducidad: []
  });
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      
      const hoy = new Date();
      
      // Fecha límite para las alertas de caducidad (7 días)
      const enSieteDias = new Date(hoy);
      enSieteDias.setDate(hoy.getDate() + 7);

      // Ejecutamos TODAS las consultas a Supabase en paralelo para que sea súper rápido
      const [
        { count: countUsuarios, error: errUsuarios },
        { count: countEjercicios, error: errEjercicios },
        { data: suscripcionesData, error: errSuscripciones },
        { data: clasesData, error: errClases }
      ] = await Promise.all([
        // 1. Contamos usuarios activos (socios)
        supabase.from('usuarios').select('*', { count: 'exact', head: true }).eq('rol', 'socio').eq('activo', true),
        
        // 2. Contamos total de ejercicios
        supabase.from('ejercicios').select('*', { count: 'exact', head: true }),
        
        // 3. Traemos las suscripciones activas para sacar ingresos y alertas
        supabase.from('suscripciones').select('id, precio, tipo_plan, fecha_fin, usuarios(nombre)').eq('estado', 'activo'),
        
        // 4. Traemos las clases colectivas
        supabase.from('clases_colectivas').select('*, reservas_clases(count)')
      ]);

      if (errUsuarios) throw errUsuarios;
      if (errEjercicios) throw errEjercicios;
      if (errSuscripciones) throw errSuscripciones;
      if (errClases) throw errClases;

      // --- PROCESAMIENTO DE DATOS (Lo que antes hacía tu Node) ---

      const listaSuscripciones = suscripcionesData || [];
      
      // A. Calcular ingresos totales
      const ingresos = listaSuscripciones.reduce((acc, curr) => acc + (parseFloat(curr.precio) || 0), 0);

      // B. Agrupar por tipo de plan
      const desglose = listaSuscripciones.reduce((acc, curr) => {
        const plan = curr.tipo_plan || 'Basic';
        acc[plan] = (acc[plan] || 0) + 1;
        return acc;
      }, {});

      // C. Sacar las alertas (Suscripciones que caducan en los próximos 7 días)
      const alertas = listaSuscripciones.filter(sub => {
        const fechaFin = new Date(sub.fecha_fin);
        return fechaFin >= hoy && fechaFin <= enSieteDias;
      });

      // Guardamos las estadísticas calculadas
      setStats({
        sociosActivos: countUsuarios || 0,
        totalEjercicios: countEjercicios || 0,
        ingresosMensuales: ingresos.toFixed(2),
        desglosePlanes: desglose,
        alertasCaducidad: alertas
      });

      // D. Procesar las Clases de Hoy
      const fechaHoyStr = hoy.toISOString().split('T')[0]; 
      
      const clasesConInscritos = (clasesData || []).map(c => ({
        ...c,
        inscritos: c.reservas_clases[0]?.count || 0
      }));

      const clasesDeHoy = clasesConInscritos.filter(clase => {
        if (!clase.horario) return true; 
        return clase.horario.startsWith(fechaHoyStr);
      });

      setClases(clasesDeHoy);

    } catch (err) {
      console.error("Error cargando el Dashboard desde Supabase:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return { stats, clases, loading, fetchDashboardData };
};