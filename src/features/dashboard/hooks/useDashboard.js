import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; 

export const useDashboard = () => {
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
      const enSieteDias = new Date(hoy);
      enSieteDias.setDate(hoy.getDate() + 7);

      const [
        { count: countUsuarios, error: errUsuarios },
        { count: countEjercicios, error: errEjercicios },
        { data: suscripcionesData, error: errSuscripciones },
        { data: clasesData, error: errClases }
      ] = await Promise.all([
        // 1. Usuarios reales con rol socio
        supabase.from('usuarios').select('*', { count: 'exact', head: true }).eq('rol', 'socio').eq('activo', true),
        
        // 2. Total de ejercicios en la base
        supabase.from('ejercicios').select('*', { count: 'exact', head: true }),
        
        // 3. Traemos suscripciones 'activas' (para comunidad) Y 'recibos' (para dinero)
        // Quitamos el .eq('estado', 'activo') para traer ambos tipos
        supabase.from('suscripciones')
          .select('id, precio, tipo_plan, estado, fecha_fin, usuarios(nombre)')
          .in('estado', ['activo', 'recibo_generado', 'recibo']),
        
        // 4. Clases del día
        supabase.from('clases_colectivas').select('*, reservas_clases(count)')
      ]);

      if (errUsuarios) throw errUsuarios;
      if (errEjercicios) throw errEjercicios;
      if (errSuscripciones) throw errSuscripciones;
      if (errClases) throw errClases;

      // --- 🧠 LÓGICA DE FILTRADO PARA EVITAR DUPLICADOS ---

      const todasLasSubs = suscripcionesData || [];
      
      // A. INGRESOS REALES: Sumamos solo los registros que son "recibos" (dinero cobrado)
      const ingresos = todasLasSubs
        .filter(s => s.estado === 'recibo_generado' || s.estado === 'recibo')
        .reduce((acc, curr) => acc + (parseFloat(curr.precio) || 0), 0);

      // B. COMUNIDAD ACTIVA: Filtramos solo los que tienen el contrato 'activo'
      const listaActivos = todasLasSubs.filter(s => s.estado === 'activo');

      // C. DESGLOSE DE PLANES: Solo sobre los activos
      const desglose = listaActivos.reduce((acc, curr) => {
        const plan = curr.tipo_plan || 'Basic';
        acc[plan] = (acc[plan] || 0) + 1;
        return acc;
      }, {});

      // D. ALERTAS DE CADUCIDAD: Solo sobre los activos
      const alertas = listaActivos.filter(sub => {
        const fechaFin = new Date(sub.fecha_fin);
        return fechaFin >= hoy && fechaFin <= enSieteDias;
      });

      // Actualizamos las estadísticas con los filtros aplicados
      setStats({
        sociosActivos: listaActivos.length, // Usamos el conteo de nuestra lista filtrada
        totalEjercicios: countEjercicios || 0,
        ingresosMensuales: ingresos.toFixed(2), // Ahora mostrará los 49.99€ reales
        desglosePlanes: desglose,
        alertasCaducidad: alertas
      });

      // E. Procesar las Clases de Hoy (igual que antes)
      const fechaHoyStr = hoy.toISOString().split('T')[0]; 
      const clasesDeHoy = (clasesData || [])
        .map(c => ({
          ...c,
          inscritos: c.reservas_clases[0]?.count || 0
        }))
        .filter(clase => clase.horario && clase.horario.startsWith(fechaHoyStr));

      setClases(clasesDeHoy);

    } catch (err) {
      console.error("Error en Dashboard:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return { stats, clases, loading, fetchDashboardData };
};