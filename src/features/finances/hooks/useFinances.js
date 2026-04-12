import { useState, useEffect, useCallback } from 'react';
import { supabase } from "../../../config/supabase";

export const useFinances = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [stats, setStats] = useState({ ingresos: 0, gastos: 0, neto: 0 });
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFinanzas = useCallback(async () => {
    try {
      setLoading(true);

      // 1. CONSULTAS PARALELAS REALES
      const [resRecibos, resGastos] = await Promise.all([
        supabase
          .from('suscripciones')
          .select('id, tipo_plan, precio, fecha_inicio, usuarios(nombre)')
          .eq('estado', 'recibo_generado') // Solo cobros reales
          .order('fecha_inicio', { ascending: false }),
        
        supabase
          .from('gastos')
          .select('*')
          .order('fecha', { ascending: false })
      ]);

      if (resRecibos.error) throw resRecibos.error;
      if (resGastos.error) throw resGastos.error;

      // 2. FORMATEAR INGRESOS CON LIMPIEZA DE CONCEPTOS
      const ingresosFormateados = (resRecibos.data || []).map(r => {
        let conceptoLimpio = r.tipo_plan;

        // Limpiamos los nombres técnicos para el usuario final
        if (conceptoLimpio.includes('AJUSTE:')) {
          const partes = conceptoLimpio.split('->');
          conceptoLimpio = `Actualización de Plan a ${partes[1] || 'Premium'}`;
        } else if (conceptoLimpio.includes('ALTA:')) {
          const plan = conceptoLimpio.split('Plan ')[1] || 'Socio';
          conceptoLimpio = `Nueva Alta - Plan ${plan}`;
        }

        return {
          id: `REC-${r.id.toString().substring(0, 6).toUpperCase()}`,
          fecha: new Date(r.fecha_inicio).toLocaleDateString('es-ES'),
          concepto: `${r.usuarios?.nombre || 'Socio'}: ${conceptoLimpio}`,
          categoria: 'Membresías',
          tipo: 'ingreso',
          importe: parseFloat(r.precio) || 0,
          estado: 'COMPLETADO',
          fechaRaw: new Date(r.fecha_inicio)
        };
      });

      // 3. FORMATEAR GASTOS
      const gastosFormateados = (resGastos.data || []).map(g => ({
        id: `GST-${g.id.toString().substring(0, 5).toUpperCase()}`,
        fecha: new Date(g.fecha).toLocaleDateString('es-ES'),
        concepto: g.concepto,
        categoria: g.categoria,
        tipo: 'gasto',
        importe: parseFloat(g.importe) || 0,
        estado: g.estado || 'COMPLETADO',
        fechaRaw: new Date(g.fecha)
      }));

      // 4. UNIR Y ORDENAR
      const todosLosMovimientos = [...ingresosFormateados, ...gastosFormateados]
        .sort((a, b) => b.fechaRaw - a.fechaRaw);

      setMovimientos(todosLosMovimientos);

      // 5. KPIs (Ingresos sin duplicados de acceso)
      const totalIngresos = ingresosFormateados.reduce((acc, curr) => acc + curr.importe, 0);
      const totalGastos = gastosFormateados.reduce((acc, curr) => acc + curr.importe, 0);
      
      setStats({
        ingresos: totalIngresos,
        gastos: totalGastos,
        neto: totalIngresos - totalGastos
      });

      // 6. DATOS DEL GRÁFICO DINÁMICOS (6 meses reales)
      const mesesLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const hoy = new Date();
      
      const chartData = Array.from({ length: 6 }).map((_, i) => {
        const d = new Date();
        d.setMonth(hoy.getMonth() - (5 - i));
        const mesIndex = d.getMonth();
        const año = d.getFullYear();

        const movsDelMes = todosLosMovimientos.filter(m => {
          const fm = m.fechaRaw;
          return fm.getMonth() === mesIndex && fm.getFullYear() === año;
        });

        return {
          mes: mesesLabels[mesIndex],
          ingresos: movsDelMes.filter(m => m.tipo === 'ingreso').reduce((acc, m) => acc + m.importe, 0),
          gastos: movsDelMes.filter(m => m.tipo === 'gasto').reduce((acc, m) => acc + m.importe, 0)
        };
      });

      setDatosGrafico(chartData);

    } catch (err) {
      console.error("Error en useFinances:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFinanzas();
  }, [fetchFinanzas]);

  return { movimientos, stats, datosGrafico, loading, refresh: fetchFinanzas };
};