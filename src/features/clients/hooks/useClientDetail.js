import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; // Ajusta la ruta según tu estructura

export const useClientDetail = (socioId, onBack) => {
  // --- ESTADOS DE DATOS ---
  const [perfil, setPerfil] = useState(null);
  const [rutinas, setRutinas] = useState([]);
  const [mediciones, setMediciones] = useState([]);
  const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]); 
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE MODALES Y FORMULARIOS ---
  const [isMedicionModalOpen, setIsMedicionModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDietaModalOpen, setIsDietaModalOpen] = useState(false);
  const [isRutinaModalOpen, setIsRutinaModalOpen] = useState(false);

  const [newMedicion, setNewMedicion] = useState({ peso_kg: '', grasa_porcentaje: '', notas_monitor: '' });
  const [editData, setEditData] = useState({ nombre: '', email: '' });
  const [newDieta, setNewDieta] = useState({ nombre_dieta: '', calorias_objetivo: '', proteinas: '', carbohidratos: '', grasas: '' });
  const [newRutina, setNewRutina] = useState({ id_ejercicio: '', dia_semana: 'Lunes', series: '', repeticiones: '' });

  const fetchData = useCallback(async () => {
    if (!socioId) return;
    setLoading(true);
    try {
      // Ejecutamos todo en paralelo como hacías en el Node
      const [resUser, resDieta, resSub, resRutinas, resMediciones, resEjercicios] = await Promise.all([
        // 1. Datos básicos del usuario
        supabase.from('usuarios').select('*').eq('id', socioId).single(),
        // 2. Última dieta asignada
        supabase.from('dietas').select('*').eq('id_usuario', socioId).order('fecha_creacion', { ascending: false }).limit(1).maybeSingle(),
        // 3. Suscripción activa
        supabase.from('suscripciones').select('*').eq('id_usuario', socioId).eq('estado', 'activo').maybeSingle(),
        // 4. Historial de rutinas con JOIN a ejercicios
        supabase.from('rutinas').select('id, dia_semana, series, repeticiones, fecha_asignacion, ejercicios(nombre, grupo_muscular)').eq('id_usuario', socioId).order('fecha_asignacion', { ascending: false }),
        // 5. Mediciones
        supabase.from('mediciones').select('*').eq('id_usuario', socioId).order('fecha_medicion', { ascending: false }),
        // 6. Catálogo de ejercicios (para los selects de los modales)
        supabase.from('ejercicios').select('*').order('nombre')
      ]);

      // Estructuramos el "perfil" tal como lo esperaba tu componente
      setPerfil({
        usuario: resUser.data,
        dieta: resDieta.data,
        suscripcion: resSub.data
      });

      setRutinas(resRutinas.data || []);
      setMediciones(resMediciones.data || []);
      setEjerciciosCatalogo(resEjercicios.data || []);
      
      if (resUser.data) {
        setEditData({ nombre: resUser.data.nombre, email: resUser.data.email });
      }

    } catch (err) {
      console.error("Error al sincronizar datos del socio:", err.message);
    } finally {
      setLoading(false);
    }
  }, [socioId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- MANEJADORES DE EVENTOS (MUTACIONES) ---

  const handleBaja = async () => {
    if (window.confirm("¿Confirmas la baja del socio? No podrá volver a entrar a la App.")) {
      try {
        const { error } = await supabase.from('usuarios').update({ activo: false }).eq('id', socioId);
        if (error) throw error;
        if (onBack) onBack();
      } catch (err) { alert("Error al procesar la baja."); }
    }
  };

  const handleEditSocio = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('usuarios').update(editData).eq('id', socioId);
      if (error) throw error;
      setEditModalOpen(false);
      fetchData();
    } catch (err) { alert("Error al actualizar datos."); }
  };

  const handleAddMedicion = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('mediciones').insert([{
        id_usuario: socioId,
        peso_kg: parseFloat(newMedicion.peso_kg),
        grasa_porcentaje: parseFloat(newMedicion.grasa_porcentaje),
        notas_monitor: newMedicion.notas_monitor
      }]);
      if (error) throw error;
      setIsMedicionModalOpen(false);
      setNewMedicion({ peso_kg: '', grasa_porcentaje: '', notas_monitor: '' });
      fetchData();
    } catch (err) { alert("Error al registrar medición."); }
  };

  const handleAddDieta = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('dietas').insert([{ ...newDieta, id_usuario: socioId }]);
      if (error) throw error;
      setIsDietaModalOpen(false);
      fetchData();
    } catch (err) { alert("Error al asignar dieta."); }
  };

  const handleAddRutina = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('rutinas').insert([{ 
        id_ejercicio: newRutina.id_ejercicio,
        dia_semana: newRutina.dia_semana,
        series: parseInt(newRutina.series),
        repeticiones: newRutina.repeticiones,
        id_usuario: socioId 
      }]);
      if (error) throw error;
      setIsRutinaModalOpen(false);
      setNewRutina({ id_ejercicio: '', dia_semana: 'Lunes', series: '', repeticiones: '' });
      fetchData();
    } catch (err) { alert("Error al asignar rutina."); }
  };

  return {
    perfil, rutinas, mediciones, ejerciciosCatalogo, loading,
    isMedicionModalOpen, setIsMedicionModalOpen,
    isEditModalOpen, setEditModalOpen,
    isDietaModalOpen, setIsDietaModalOpen,
    isRutinaModalOpen, setIsRutinaModalOpen,
    newMedicion, setNewMedicion,
    editData, setEditData,
    newDieta, setNewDieta,
    newRutina, setNewRutina,
    handleBaja, handleEditSocio, handleAddMedicion, handleAddDieta, handleAddRutina
  };
};