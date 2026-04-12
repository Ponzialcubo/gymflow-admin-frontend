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

      // 1. CONSULTAS PARALELAS (Siguiendo la lógica de usePayments)
      const [resRecibos, resGastos] = await Promise.all([
        // Solo traemos lo que es un RECIBO REAL de pago
        supabase
          .from('suscripciones')
          .select('id, tipo_plan, precio, fecha_inicio, usuarios(nombre)')
          .eq('estado', 'recibo_generado') // <--- CRÍTICO: Solo dinero real
          .order('fecha_inicio', { ascending: false }),
        
        // Traemos los gastos reales de la tabla de gastos
        supabase
          .from('gastos')
          .select('*')
          .order('fecha', { ascending: false })
      ]);

      if (resRecibos.error) throw resRecibos.error;
      if (resGastos.error) throw resGastos.error;

      // 2. FORMATEAR INGRESOS (Transformamos recibos en movimientos de caja)
      const ingresosFormateados = (resRecibos.data || []).map(r => ({
        id: `REC-${r.id.toString().substring(0, 6).toUpperCase()}`,
        fecha: new Date(r.fecha_inicio).toLocaleDateString('es-ES'),
        // El concepto ya viene limpio del hook de pagos (ej: "AJUSTE: Basic -> Pro")
        concepto: r.tipo_plan.includes(':') ? r.tipo_plan : `CUOTA: ${r.usuarios?.nombre || 'Socio'} - ${r.tipo_plan}`,
        categoria: 'Membresías',
        tipo: 'ingreso',
        importe: parseFloat(r.precio) || 0,
        estado: 'COMPLETADO',
        fechaRaw: new Date(r.fecha_inicio)
      }));

      // 3. FORMATEAR GASTOS (De tu tabla de gastos)
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

      // 4. UNIR Y ORDENAR LIBRO MAYOR
      const todosLosMovimientos = [...ingresosFormateados, ...gastosFormateados]
        .sort((a, b) => b.fechaRaw - a.fechaRaw);

      setMovimientos(todosLosMovimientos);

      // 5. CÁLCULO DE MÉTRICAS REALES (Sin duplicados)
      const totalIngresos = ingresosFormateados.reduce((acc, curr) => acc + curr.importe, 0);
      const totalGastos = gastosFormateados.reduce((acc, curr) => acc + curr.importe, 0);
      
      setStats({
        ingresos: totalIngresos,
        gastos: totalGastos,
        neto: totalIngresos - totalGastos
      });

      // 6. LÓGICA DEL GRÁFICO (Últimos meses)
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const hoy = new Date();
      
      // Aquí generamos los 6 meses anteriores dinámicamente
      const dataGrafico = Array.from({ length: 6 }).map((_, i) => {
        const d = new Date();
        d.setMonth(hoy.getMonth() - (5 - i));
        const mesNombre = meses[d.getMonth()];
        
        // Filtramos movimientos que pertenecen a ese mes/año
        const movsMes = todosLosMovimientos.filter(m => {
          return m.fechaRaw.getMonth() === d.getMonth() && m.fechaRaw.getFullYear() === d.getFullYear();
        });

        return {
          mes: mesNombre,
          ingresos: movsMes.filter(m => m.tipo === 'ingreso').reduce((acc, m) => acc + m.importe, 0),
          gastos: movsMes.filter(m => m.tipo === 'gasto').reduce((acc, m) => acc + m.importe, 0)
        };
      });

      setDatosGrafico(dataGrafico);

    } catch (err) {
      console.error("Error financiero:", err.message);
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