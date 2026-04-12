import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../../config/supabase';

export const useNutrition = () => {
  const [socios, setSocios] = useState([]);
  const [catalogoAlimentos, setCatalogoAlimentos] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [loading, setLoading] = useState(false);
  
  // Objetivos fijados por el monitor
  const [form, setForm] = useState({ 
    id_usuario: '', 
    nombre_dieta: 'Mantenimiento Base', 
    calorias_objetivo: 2500, 
    proteinas: 150, 
    carbohidratos: 250, 
    grasas: 70 
  });

  // Estado del lienzo de comidas (Estructura de Nivel 2)
  const [comidas, setComidas] = useState([
  { id_temporal: 'c1', nombre: 'Desayuno', alimentos: [] },
  { id_temporal: 'c2', nombre: 'Comida', alimentos: [] },   
  { id_temporal: 'c3', nombre: 'Merienda', alimentos: [] },  
  { id_temporal: 'c4', nombre: 'Cena', alimentos: [] }       
]);

  // 1. Carga inicial de datos
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

  // 2. LÓGICA DE CÁLCULO EN TIEMPO REAL (Totales sumados de los alimentos añadidos)
  const totalesActuales = useMemo(() => {
    let p = 0, c = 0, g = 0;

    comidas.forEach(comida => {
      comida.alimentos.forEach(al => {
        const factor = al.cantidad_g / 100;
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

  // Usamos el total sumado para comparar con el objetivo del formulario
  const kcalCalculadas = totalesActuales.kcal;
  const diferenciaKcal = Math.abs(kcalCalculadas - form.calorias_objetivo);

  // 3. ENVÍO MAESTRO A SUPABASE (Transaccional manual)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!form.id_usuario) return setMensaje({ texto: '⚠️ Selecciona un socio', tipo: 'error' });

    setLoading(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      // A. Desactivar dietas anteriores (Opcional, para que solo haya una 'activa')
      await supabase
        .from('dietas')
        .update({ activa: false })
        .eq('id_usuario', form.id_usuario)
        .eq('activa', true);

      // B. Insertar la Dieta Principal (Estrategia)
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

      // C. Recorrer bloques de comidas e insertar
      for (const comida of comidas) {
        if (comida.alimentos.length === 0) continue; 

        // Dentro del bucle for de handleSubmit en useNutrition.js

        const { data: comidaData, error: errorComida } = await supabase
          .from('comidas_dieta')
          .insert([{ 
            id_dieta: dietaId, 
            momento_dia: comida.nombre 
            // Fíjate que YA NO enviamos la columna "alimentos" aquí
          }])
          .select('id').single();
          
        if (errorComida) throw errorComida;

        // D. Insertar alimentos vinculados a esa comida
        const alimentosAInsertar = comida.alimentos.map(al => ({
          id_comida: comidaData.id,
          id_alimento: al.id,
          cantidad_g: al.cantidad_g
        }));

        const { error: errorAlimentos } = await supabase
          .from('comida_alimentos')
          .insert(alimentosAInsertar);
          
        if (errorAlimentos) throw errorAlimentos;
      }

      // Feedback de éxito
      const nombreSocio = socios.find(s => s.id === form.id_usuario)?.nombre;
      setRecientes(prev => [{
        id: Date.now(),
        socio: nombreSocio,
        plan: form.nombre_dieta,
        kcal: form.calorias_objetivo
      }, ...prev].slice(0, 3));

      setMensaje({ texto: '✅ Plan completo sincronizado correctamente', tipo: 'success' });
      
      // Reset del lienzo
      setComidas([
        { id_temporal: 'c1', nombre: 'Desayuno', alimentos: [] },
        { id_temporal: 'c2', nombre: 'Almuerzo', alimentos: [] },
        { id_temporal: 'c3', nombre: 'Cena', alimentos: [] }
      ]);
      
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);

    } catch (err) {
      console.error("Error en el guardado complejo:", err);
      setMensaje({ texto: '❌ Error: ' + (err.message || 'Error en el servidor'), tipo: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return {
  socios, form, setForm, recientes, mensaje, loading,
  kcalCalculadas, totalesActuales, diferenciaKcal, handleSubmit,
  comidas, setComidas, catalogoAlimentos
};
};