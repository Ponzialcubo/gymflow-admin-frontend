import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; // Ajusta la ruta a tu config

export const useNutrition = () => {
  const [socios, setSocios] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({ 
    id_usuario: '', 
    nombre_dieta: 'Mantenimiento Base', 
    calorias_objetivo: 2500, 
    proteinas: 150, 
    carbohidratos: 250, 
    grasas: 70 
  });

  // Carga inicial de socios
  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select('id, nombre')
          .eq('rol', 'socio')
          .eq('activo', true)
          .order('nombre');

        if (error) throw error;

        setSocios(data || []);
        // Si hay socios, seleccionamos el primero por defecto en el select
        if(data && data.length > 0) {
          setForm(f => ({...f, id_usuario: data[0].id}));
        }
      } catch (err) {
        setMensaje({ texto: '❌ Error al conectar con Supabase', tipo: 'error' });
      }
    };
    fetchSocios();
  }, []);

  // --- Lógica de Negocio: Cálculo de Coherencia ---
  // Las proteínas y HC tienen 4 kcal/g, las grasas 9 kcal/g.
  const kcalCalculadas = useMemo(() => {
    return (form.proteinas * 4) + (form.carbohidratos * 4) + (form.grasas * 9);
  }, [form.proteinas, form.carbohidratos, form.grasas]);

  const diferenciaKcal = Math.abs(kcalCalculadas - form.calorias_objetivo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      // Inserción en la tabla 'dietas'
      const { error } = await supabase
        .from('dietas')
        .insert([{
          id_usuario: form.id_usuario,
          nombre_dieta: form.nombre_dieta,
          calorias_objetivo: parseInt(form.calorias_objetivo),
          proteinas: parseInt(form.proteinas),
          carbohidratos: parseInt(form.carbohidratos),
          grasas: parseInt(form.grasas)
        }]);

      if (error) throw error;
      
      // Actualizamos la lista local de "Recientes" para feedback visual
      const nombreSocio = socios.find(s => s.id == form.id_usuario)?.nombre;
      setRecientes(prev => [{
        id: Date.now(),
        socio: nombreSocio,
        plan: form.nombre_dieta,
        kcal: form.calorias_objetivo
      }, ...prev].slice(0, 3));

      setMensaje({ texto: '✅ Plan nutricional sincronizado en la nube', tipo: 'success' });
      
      // Limpiamos el mensaje tras unos segundos
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);

    } catch (err) {
      console.error(err);
      setMensaje({ texto: '❌ Error al guardar el plan: ' + err.message, tipo: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return {
    socios, form, setForm, recientes, mensaje, loading,
    kcalCalculadas, diferenciaKcal, handleSubmit
  };
};