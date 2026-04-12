import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../../config/supabase';

export const useNutrition = () => {
  const [socios, setSocios] = useState([]);
  const [catalogoAlimentos, setCatalogoAlimentos] = useState([]);
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

  // Configuración de las 4 comidas solicitadas
  const [comidas, setComidas] = useState([
    { id_temporal: 'c1', nombre: 'Desayuno', alimentos: [] },
    { id_temporal: 'c2', nombre: 'Comida', alimentos: [] },   
    { id_temporal: 'c3', nombre: 'Merienda', alimentos: [] },  
    { id_temporal: 'c4', nombre: 'Cena', alimentos: [] }       
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resSocios, resAlimentos] = await Promise.all([
          supabase.from('usuarios').select('id, nombre').eq('rol', 'socio').eq('activo', true).order('nombre'),
          supabase.from('alimentos_catalogo').select('*').eq('activo', true).order('nombre')
        ]);

        if (resSocios.error) throw resSocios.error;
        if (resAlimentos.error) throw resAlimentos.error;

        setSocios(resSocios.data || []);
        setCatalogoAlimentos(resAlimentos.data || []);
        
        if(resSocios.data?.length > 0) {
          setForm(f => ({...f, id_usuario: resSocios.data[0].id}));
        }
      } catch (err) {
        setMensaje({ texto: '❌ Error de conexión', tipo: 'error' });
      }
    };
    fetchData();
  }, []);

  // CÁLCULO DINÁMICO DE MACROS (Suma de alimentos)
  const totalesActuales = useMemo(() => {
    let p = 0, c = 0, g = 0;
    comidas.forEach(comida => {
      comida.alimentos?.forEach(al => {
        const factor = (al.cantidad_g || 0) / 100;
        p += (al.proteinas_100g || 0) * factor;
        c += (al.carbohidratos_100g || 0) * factor;
        g += (al.grasas_100g || 0) * factor;
      });
    });
    const kcal = (p * 4) + (c * 4) + (g * 9);
    return { 
      proteinas: Math.round(p), 
      carbohidratos: Math.round(c), 
      grasas: Math.round(g), 
      kcal: Math.round(kcal) 
    };
  }, [comidas]);

  const diferenciaKcal = Math.abs((totalesActuales?.kcal || 0) - form.calorias_objetivo);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!form.id_usuario) return setMensaje({ texto: '⚠️ Selecciona un socio', tipo: 'error' });

    setLoading(true);
    try {
      // Desactivar anteriores
      await supabase.from('dietas').update({ activa: false }).eq('id_usuario', form.id_usuario);

      // 1. Insertar Dieta
      const { data: dietaData, error: errorDieta } = await supabase
        .from('dietas')
        .insert([{
          id_usuario: form.id_usuario,
          nombre_dieta: form.nombre_dieta,
          calorias_objetivo: parseInt(form.calorias_objetivo),
          proteinas: parseInt(form.proteinas),
          carbohidratos: parseInt(form.carbohidratos),
          grasas: parseInt(form.grasas),
          activa: true
        }])
        .select('id').single();

      if (errorDieta) throw errorDieta;

      // 2. Insertar Comidas y Alimentos
      for (const comida of comidas) {
        if (comida.alimentos.length === 0) continue; 
        const { data: cData, error: eC } = await supabase
          .from('comidas_dieta')
          .insert([{ id_dieta: dietaData.id, momento_dia: comida.nombre }])
          .select('id').single();
        if (eC) throw eC;

        const alimentosInsert = comida.alimentos.map(al => ({
          id_comida: cData.id,
          id_alimento: al.id,
          cantidad_g: al.cantidad_g
        }));
        await supabase.from('comida_alimentos').insert(alimentosInsert);
      }

      setMensaje({ texto: '✅ Plan guardado con éxito', tipo: 'success' });
      setComidas([
        { id_temporal: 'c1', nombre: 'Desayuno', alimentos: [] },
        { id_temporal: 'c2', nombre: 'Comida', alimentos: [] },   
        { id_temporal: 'c3', nombre: 'Merienda', alimentos: [] },  
        { id_temporal: 'c4', nombre: 'Cena', alimentos: [] }
      ]);
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
    } catch (err) {
      setMensaje({ texto: '❌ Error: ' + err.message, tipo: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return {
    socios, form, setForm, recientes, mensaje, loading,
    totalesActuales, diferenciaKcal, handleSubmit,
    comidas, setComidas, catalogoAlimentos
  };
};