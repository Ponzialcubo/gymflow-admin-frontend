import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../../../config/supabase'; 

export const useClientDetail = (socioId, onBack) => {
  const [perfil, setPerfil] = useState(null);
  const [rutinas, setRutinas] = useState([]);
  const [mediciones, setMediciones] = useState([]);
  const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]); 
  const [catalogoAlimentos, setCatalogoAlimentos] = useState([]); // <-- NUEVO
  const [loading, setLoading] = useState(true);

  // Modales
  const [isMedicionModalOpen, setIsMedicionModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDietaModalOpen, setIsDietaModalOpen] = useState(false);
  const [isRutinaModalOpen, setIsRutinaModalOpen] = useState(false);

  // Estados de formularios
  const [newMedicion, setNewMedicion] = useState({ peso_kg: '', altura_cm: '', imc: '', grasa_porcentaje: '', notas_monitor: '' });
  const [editData, setEditData] = useState({ nombre: '', email: '' });
  
  // 🍎 Nutrición: Estado del Formulario Superior (Metas)
  const [newDieta, setNewDieta] = useState({ 
    nombre_dieta: 'Mantenimiento Base', 
    calorias_objetivo: 2500, 
    proteinas: 150, 
    carbohidratos: 250, 
    grasas: 70 
  });

  // 🍎 Nutrición: Estado de los Bloques de Comidas (Lienzo)
  const [comidas, setComidas] = useState([
    { id_temporal: 'c1', nombre: 'Desayuno', alimentos: [] },
    { id_temporal: 'c2', nombre: 'Comida', alimentos: [] },
    { id_temporal: 'c3', nombre: 'Merienda', alimentos: [] },
    { id_temporal: 'c4', nombre: 'Cena', alimentos: [] }
  ]);

  const [newRutina, setNewRutina] = useState({ id_ejercicio: '', dia_semana: 'Lunes', series: '', repeticiones: '' });

  const fetchData = useCallback(async () => {
    if (!socioId) return;
    setLoading(true);
    try {
      const [resUser, resDieta, resSub, resRutinas, resMediciones, resEjercicios, resAlimentos] = await Promise.all([
        supabase.from('usuarios').select('*').eq('id', socioId).single(),
        supabase.from('dietas').select('*').eq('id_usuario', socioId).eq('activa', true).maybeSingle(),
        supabase.from('suscripciones').select('*').eq('id_usuario', socioId).eq('estado', 'activo').maybeSingle(),
        supabase.from('rutinas').select('id, dia_semana, series, repeticiones, fecha_asignacion, ejercicios(nombre, grupo_muscular)').eq('id_usuario', socioId).order('fecha_asignacion', { ascending: false }),
        supabase.from('mediciones').select('*').eq('id_usuario', socioId).order('fecha_medicion', { ascending: false }),
        supabase.from('ejercicios').select('*').order('nombre'),
        supabase.from('alimentos_catalogo').select('*').eq('activo', true).order('nombre') // <-- CARGAMOS ALIMENTOS
      ]);

      setPerfil({ usuario: resUser.data, dieta: resDieta.data, suscripcion: resSub.data });
      setRutinas(resRutinas.data || []);
      setMediciones(resMediciones.data || []);
      setEjerciciosCatalogo(resEjercicios.data || []);
      setCatalogoAlimentos(resAlimentos.data || []); // <-- GUARDAMOS ALIMENTOS
      
      if (resUser.data) setEditData({ nombre: resUser.data.nombre, email: resUser.data.email });
    } catch (err) {
      console.error("Error al sincronizar datos:", err);
    } finally {
      setLoading(false);
    }
  }, [socioId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // 🍎 LÓGICA DE CÁLCULO DE MACROS EN TIEMPO REAL
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
    return { 
      proteinas: Math.round(p), 
      carbohidratos: Math.round(c), 
      grasas: Math.round(g), 
      kcal: Math.round((p * 4) + (c * 4) + (g * 9)) 
    };
  }, [comidas]);

  const diferenciaKcal = Math.abs(totalesActuales.kcal - newDieta.calorias_objetivo);

  // --- HANDLERS ---

  const handleBaja = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres dar de baja a este socio?");
    if (!confirmacion) return;
    try {
      await supabase.from('suscripciones').update({ estado: 'cancelado' }).eq('id_usuario', socioId).eq('estado', 'activo');
      await supabase.from('usuarios').update({ activo: false }).eq('id', socioId);
      if (onBack) onBack();
    } catch (error) { console.error(error); }
  };

  const handleEditSocio = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('usuarios').update(editData).eq('id', socioId);
      setEditModalOpen(false);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleAddMedicion = async (e) => {
    e.preventDefault(); 
    try {
      const peso = parseFloat(newMedicion.peso_kg);
      const altura = parseFloat(newMedicion.altura_cm);
      const imc = (peso > 0 && altura > 0) ? parseFloat((peso / Math.pow(altura / 100, 2)).toFixed(1)) : null;
      
      const payload = {
        id_usuario: socioId,
        peso_kg: peso,
        altura_cm: altura,
        imc: imc,
        grasa_porcentaje: newMedicion.grasa_porcentaje ? parseFloat(newMedicion.grasa_porcentaje) : null,
        notas_monitor: newMedicion.notas_monitor?.trim() || null
      };

      const { error } = await supabase.from('mediciones').insert([payload]);
      if (error) throw error;
      setIsMedicionModalOpen(false);
      setNewMedicion({ peso_kg: '', altura_cm: '', imc: '', grasa_porcentaje: '', notas_monitor: '' });
      fetchData();
    } catch (err) { console.error(err); }
  };
  
  // 🍎 GUARDADO COMPLEJO DE DIETA (NIVEL 2)
  const handleAddDieta = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      // 1. Desactivamos la dieta anterior
      await supabase.from('dietas').update({ activa: false }).eq('id_usuario', socioId).eq('activa', true);

      // 2. Insertamos la nueva Dieta Maestra (Usando los totales reales de los alimentos)
      const { data: dietaData, error: errorDieta } = await supabase
        .from('dietas')
        .insert([{ 
          ...newDieta, 
          id_usuario: socioId,
          calorias_objetivo: totalesActuales.kcal,
          proteinas: totalesActuales.proteinas,
          carbohidratos: totalesActuales.carbohidratos,
          grasas: totalesActuales.grasas,
          activa: true 
        }])
        .select('id').single();

      if (errorDieta) throw errorDieta;

      // 3. Insertamos Comidas y sus Alimentos vinculados
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

      setIsDietaModalOpen(false);
      setComidas([
        { id_temporal: 'c1', nombre: 'Desayuno', alimentos: [] },
        { id_temporal: 'c2', nombre: 'Comida', alimentos: [] },
        { id_temporal: 'c3', nombre: 'Merienda', alimentos: [] },
        { id_temporal: 'c4', nombre: 'Cena', alimentos: [] }
      ]);
      fetchData();
    } catch (err) { 
      console.error("Error al asignar dieta:", err);
      alert("Error al guardar el plan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRutina = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('rutinas').insert([{ 
        id_ejercicio: newRutina.id_ejercicio, dia_semana: newRutina.dia_semana,
        series: parseInt(newRutina.series), repeticiones: newRutina.repeticiones, id_usuario: socioId 
      }]);
      setIsRutinaModalOpen(false);
      setNewRutina({ id_ejercicio: '', dia_semana: 'Lunes', series: '', repeticiones: '' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  return {
    perfil, rutinas, mediciones, ejerciciosCatalogo, catalogoAlimentos, loading,
    isMedicionModalOpen, setIsMedicionModalOpen, isEditModalOpen, setEditModalOpen,
    isDietaModalOpen, setIsDietaModalOpen, isRutinaModalOpen, setIsRutinaModalOpen,
    newMedicion, setNewMedicion, editData, setEditData, newDieta, setNewDieta,
    comidas, setComidas, totalesActuales, diferenciaKcal, // <-- EXPORTAMOS PARA LA UI
    newRutina, setNewRutina, handleBaja, handleEditSocio, handleAddMedicion, handleAddDieta, handleAddRutina
  };
};