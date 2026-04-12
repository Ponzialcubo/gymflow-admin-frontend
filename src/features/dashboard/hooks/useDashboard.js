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
      // Calculamos el rango del mes actual
      const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
      const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0, 23, 59, 59);

      const enSieteDias = new Date(hoy);
      enSieteDias.setDate(hoy.getDate() + 7);

      const [
        { count: countUsuarios, error: errUsuarios },
        { count: countEjercicios, error: errEjercicios },
        { data: suscripcionesData, error: errSuscripciones },
        { data: clasesData, error: errClases }
      ] = await Promise.all([
        supabase.from('usuarios').select('*', { count: 'exact', head: true }).eq('rol', 'socio').eq('activo', true),
        supabase.from('ejercicios').select('*', { count: 'exact', head: true }),
        // AÑADIDO: fecha_inicio para poder filtrar por mes
        supabase.from('suscripciones')
          .select('id, precio, tipo_plan, estado, fecha_fin, fecha_inicio, usuarios(nombre)')
          .in('estado', ['activo', 'recibo_generado', 'recibo']),
        supabase.from('clases_colectivas').select('*, reservas_clases(count)')
      ]);

      if (errUsuarios) throw errUsuarios;
      if (errEjercicios) throw errEjercicios;
      if (errSuscripciones) throw errSuscripciones;
      if (errClases) throw errClases;

      const todasLasSubs = suscripcionesData || [];
      
      // --- 🧠 LÓGICA DE FILTRADO MENSUAL ---

      // A. INGRESOS MENSUALES: Filtramos por estado Y por fecha (Solo este mes)
      const ingresos = todasLasSubs
        .filter(s => {
          const esRecibo = s.estado === 'recibo_generado' || s.estado === 'recibo';
          const fechaSujeta = new Date(s.fecha_inicio);
          // Solo sumamos si es del mes actual
          return esRecibo && (fechaSujeta >= inicioMes && fechaSujeta <= finMes);
        })
        .reduce((acc, curr) => acc + (parseFloat(curr.precio) || 0), 0);

      // B. COMUNIDAD ACTIVA: (Esto se queda igual, son los que tienen acceso hoy)
      const listaActivos = todasLasSubs.filter(s => s.estado === 'activo');

      // C. DESGLOSE DE PLANES
      const desglose = listaActivos.reduce((acc, curr) => {
        const plan = curr.tipo_plan || 'Basic';
        acc[plan] = (acc[plan] || 0) + 1;
        return acc;
      }, {});

      setStats({
        sociosActivos: listaActivos.length,
        totalEjercicios: countEjercicios || 0,
        ingresosMensuales: ingresos.toFixed(2), // Ahora solo sumará Abril
        desglosePlanes: desglose,
        alertasCaducidad: listaActivos.filter(sub => {
          const f = new Date(sub.fecha_fin);
          return f >= hoy && f <= enSieteDias;
        })
      });

      // E. Clases de Hoy
      const fechaHoyStr = hoy.toISOString().split('T')[0]; 
      const clasesDeHoy = (clasesData || [])
        .map(c => ({ ...c, inscritos: c.reservas_clases[0]?.count || 0 }))
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