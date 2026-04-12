import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; // Ajusta la ruta

export const useFinances = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [stats, setStats] = useState({ ingresos: 0, gastos: 0, neto: 0 });
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFinanzas = useCallback(async () => {
    try {
      setLoading(true);

      // --- 1. TRAER INGRESOS REALES (Desde tu tabla de Suscripciones) ---
      const { data: subsData, error } = await supabase
        .from('suscripciones')
        .select(`id, tipo_plan, estado, precio, fecha_inicio, usuarios(nombre)`)
        .order('fecha_inicio', { ascending: false });

      if (error) throw error;

      // Filtramos solo los cobros reales y los adaptamos al formato del Libro Mayor
      const ingresosReales = (subsData || [])
        .filter(s => s.estado === 'recibo_generado' || s.estado === 'recibo')
        .map(s => ({
          id: `REC-${s.id.substring(0, 6).toUpperCase()}`, // Acortamos el ID visualmente
          fecha: new Date(s.fecha_inicio).toLocaleDateString('es-ES'),
          concepto: `Cuota: ${s.usuarios?.nombre || 'Socio'} - ${s.tipo_plan}`,
          categoria: 'Membresías',
          tipo: 'ingreso',
          importe: parseFloat(s.precio) || 0,
          estado: 'COMPLETADO',
          fechaRaw: new Date(s.fecha_inicio) // Lo guardamos para ordenar cronológicamente
        }));

      // --- 2. GASTOS SIMULADOS (Hasta que crees tu tabla de gastos en Supabase) ---
      const hoy = new Date();
      const mesActual = hoy.getMonth();
      const añoActual = hoy.getFullYear();

      const gastosSimulados = [
        { id: 'GST-001', fecha: new Date(añoActual, mesActual, 1).toLocaleDateString('es-ES'), concepto: 'Alquiler Nave Sede', categoria: 'Operativo', tipo: 'gasto', importe: 1200.00, estado: 'COMPLETADO', fechaRaw: new Date(añoActual, mesActual, 1) },
        { id: 'GST-002', fecha: new Date(añoActual, mesActual, 5).toLocaleDateString('es-ES'), concepto: 'Nóminas Equipo', categoria: 'Laboral', tipo: 'gasto', importe: 1850.00, estado: 'COMPLETADO', fechaRaw: new Date(añoActual, mesActual, 5) },
        { id: 'GST-003', fecha: new Date(añoActual, mesActual, 10).toLocaleDateString('es-ES'), concepto: 'Luz y Suministros', categoria: 'Operativo', tipo: 'gasto', importe: 340.00, estado: 'COMPLETADO', fechaRaw: new Date(añoActual, mesActual, 10) },
        { id: 'GST-004', fecha: new Date(añoActual, mesActual, 15).toLocaleDateString('es-ES'), concepto: 'Mantenimiento Maquinaria', categoria: 'Equipamiento', tipo: 'gasto', importe: 250.00, estado: 'PENDIENTE', fechaRaw: new Date(añoActual, mesActual, 15) },
      ];

      // --- 3. UNIR Y ORDENAR TODO EL LIBRO MAYOR ---
      const todosLosMovimientos = [...ingresosReales, ...gastosSimulados]
        .sort((a, b) => b.fechaRaw - a.fechaRaw); // Ordenados del más reciente al más antiguo

      setMovimientos(todosLosMovimientos);

      // --- 4. CÁLCULO DE KPIs ---
      const ingresos = todosLosMovimientos.filter(m => m.tipo === 'ingreso').reduce((acc, m) => acc + m.importe, 0);
      const gastos = todosLosMovimientos.filter(m => m.tipo === 'gasto').reduce((acc, m) => acc + m.importe, 0);
      const neto = ingresos - gastos;

      setStats({ ingresos, gastos, neto });

      // --- 5. DATOS PARA EL GRÁFICO (Evolución 6 meses) ---
      const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const nombreMesActual = mesesNombres[mesActual];

      setDatosGrafico([
        { mes: mesesNombres[(mesActual - 5 + 12) % 12], ingresos: 3200, gastos: 2100 },
        { mes: mesesNombres[(mesActual - 4 + 12) % 12], ingresos: 3800, gastos: 2300 },
        { mes: mesesNombres[(mesActual - 3 + 12) % 12], ingresos: 4500, gastos: 2800 },
        { mes: mesesNombres[(mesActual - 2 + 12) % 12], ingresos: 4800, gastos: 2100 },
        { mes: mesesNombres[(mesActual - 1 + 12) % 12], ingresos: 5100, gastos: 2200 },
        { mes: nombreMesActual, ingresos: ingresos, gastos: gastos }, // ¡El mes actual usa tus datos reales!
      ]);

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
    movimientos, 
    stats, 
    datosGrafico, 
    loading, 
    refresh: fetchFinanzas 
  };
};