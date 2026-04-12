import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase';

export const useFinances = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [stats, setStats] = useState({ ingresos: 0, gastos: 0, neto: 0 });
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFinanzas = useCallback(async () => {
    try {
      setLoading(true);

      // 1. OBTENER INGRESOS (Suscripciones reales)
      const { data: subsData, error: subsError } = await supabase
        .from('suscripciones')
        .select(`id, tipo_plan, estado, precio, fecha_inicio, usuarios(nombre)`)
        .order('fecha_inicio', { ascending: false });

      if (subsError) throw subsError;

      const ingresosReales = (subsData || [])
        .filter(s => s.estado === 'recibo_generado' || s.estado === 'recibo' || s.estado === 'activo')
        .map(s => ({
          id: `REC-${s.id.substring(0, 6).toUpperCase()}`,
          fecha: new Date(s.fecha_inicio).toLocaleDateString('es-ES'),
          concepto: `Cuota: ${s.usuarios?.nombre || 'Socio'} - ${s.tipo_plan}`,
          categoria: 'Membresías',
          tipo: 'ingreso',
          importe: parseFloat(s.precio) || 0,
          estado: 'COMPLETADO',
          fechaRaw: new Date(s.fecha_inicio)
        }));

      // 2. OBTENER GASTOS (De tu tabla real en Supabase)
      const { data: gastosData, error: gastosError } = await supabase
        .from('gastos')
        .select('*')
        .order('fecha', { ascending: false });

      if (gastosError) throw gastosError;

      const gastosReales = (gastosData || []).map(g => ({
        id: `GST-${g.id.substring(0, 5).toUpperCase()}`,
        fecha: new Date(g.fecha).toLocaleDateString('es-ES'),
        concepto: g.concepto,
        categoria: g.categoria,
        tipo: 'gasto',
        importe: parseFloat(g.importe) || 0,
        estado: g.estado || 'COMPLETADO',
        fechaRaw: new Date(g.fecha)
      }));

      // 3. UNIR TODO (Sin simulaciones)
      const todosLosMovimientos = [...ingresosReales, ...gastosReales]
        .sort((a, b) => b.fechaRaw - a.fechaRaw);

      setMovimientos(todosLosMovimientos);

      // 4. CALCULAR MÉTRICAS REALES
      const ingresos = ingresosReales.reduce((acc, m) => acc + m.importe, 0);
      const gastos = gastosReales.reduce((acc, m) => acc + m.importe, 0);
      
      setStats({ ingresos, gastos, neto: ingresos - gastos });

      // 5. PREPARAR GRÁFICO (Diferenciando histórico vs mes actual real)
      const mesesNombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const mesActual = new Date().getMonth();

      setDatosGrafico([
        { mes: mesesNombres[(mesActual - 2 + 12) % 12], ingresos: 0, gastos: 0 },
        { mes: mesesNombres[(mesActual - 1 + 12) % 12], ingresos: 0, gastos: 0 },
        { mes: mesesNombres[mesActual], ingresos, gastos },
      ]);

    } catch (err) {
      console.error("Error en useFinances:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFinanzas(); }, [fetchFinanzas]);

  return { movimientos, stats, datosGrafico, loading, refresh: fetchFinanzas };
};