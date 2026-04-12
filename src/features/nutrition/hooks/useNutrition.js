import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../../config/supabase';

export const useNutrition = () => {
  const [socios, setSocios] = useState([]);
  const [catalogoAlimentos, setCatalogoAlimentos] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({ 
    id_usuario: '', nombre_dieta: 'Mantenimiento Base', 
    calorias_objetivo: 2500, proteinas: 150, carbohidratos: 250, grasas: 70 
  });

  // Estado inicial del lienzo de comidas
  const [comidas, setComidas] = useState([
    { id_temporal: 'c1', nombre: 'Desayuno', alimentos: [] },
    { id_temporal: 'c2', nombre: 'Almuerzo', alimentos: [] },
    { id_temporal: 'c3', nombre: 'Cena', alimentos: [] }
  ]);

  // Carga inicial (Socios y Catálogo de Alimentos)
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
        
        if(resSocios.data && resSocios.data.length > 0) {
          setForm(f => ({...f, id_usuario: resSocios.data[0].id}));
        }
      } catch (err) {
        setMensaje({ texto: '❌ Error al conectar con la Base de Datos', tipo: 'error' });
      }
    };
    fetchData();
  }, []);

  const kcalCalculadas = useMemo(() => {
    return (form.proteinas * 4) + (form.carbohidratos * 4) + (form.grasas * 9);
  }, [form.proteinas, form.carbohidratos, form.grasas]);

  const diferenciaKcal = Math.abs(kcalCalculadas - form.calorias_objetivo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      // 1. Guardamos la Dieta Maestra
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
      const dietaId = dietaData.id;

      // 2. Por cada comida, la guardamos y luego guardamos sus alimentos
      for (const comida of comidas) {
        if (comida.alimentos.length === 0) continue; // Saltamos comidas vacías

        const { data: comidaData, error: errorComida } = await supabase
          .from('comidas_dieta')
          .insert([{ id_dieta: dietaId, momento_dia: comida.nombre }])
          .select('id').single();
          
        if (errorComida) throw errorComida;

        // 3. Insertamos los alimentos de esa comida
        const alimentosAInsertar = comida.alimentos.map(alimento => ({
          id_comida: comidaData.id,
          id_alimento: alimento.id,
          cantidad_g: alimento.cantidad_g
        }));

        if (alimentosAInsertar.length > 0) {
          const { error: errorAlimentos } = await supabase.from('comida_alimentos').insert(alimentosAInsertar);
          if (errorAlimentos) throw errorAlimentos;
        }
      }

      setMensaje({ texto: '✅ Plan Nutricional Asignado Correctamente', tipo: 'success' });
      
      // Limpiamos el lienzo
      setComidas([
        { id_temporal: 'c1', nombre: 'Desayuno', alimentos: [] },
        { id_temporal: 'c2', nombre: 'Almuerzo', alimentos: [] },
        { id_temporal: 'c3', nombre: 'Cena', alimentos: [] }
      ]);
      
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
    kcalCalculadas, diferenciaKcal, handleSubmit,
    comidas, setComidas, catalogoAlimentos
  };
};