import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; 

export const useClientDetail = (socioId, onBack) => {
  const [perfil, setPerfil] = useState(null);
  const [rutinas, setRutinas] = useState([]);
  const [mediciones, setMediciones] = useState([]);
  const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [isMedicionModalOpen, setIsMedicionModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDietaModalOpen, setIsDietaModalOpen] = useState(false);
  const [isRutinaModalOpen, setIsRutinaModalOpen] = useState(false);

  const [newMedicion, setNewMedicion] = useState({ peso_kg: '', altura_cm: '', imc: '', grasa_porcentaje: '', notas_monitor: '' });
  const [editData, setEditData] = useState({ nombre: '', email: '' });
  const [newDieta, setNewDieta] = useState({ nombre_dieta: '', calorias_objetivo: '', proteinas: '', carbohidratos: '', grasas: '' });
  const [newRutina, setNewRutina] = useState({ id_ejercicio: '', dia_semana: 'Lunes', series: '', repeticiones: '' });

  const fetchData = useCallback(async () => {
    if (!socioId) return;
    setLoading(true);
    try {
      const [resUser, resDieta, resSub, resRutinas, resMediciones, resEjercicios] = await Promise.all([
        supabase.from('usuarios').select('*').eq('id', socioId).single(),
        supabase.from('dietas').select('*').eq('id_usuario', socioId).order('fecha_creacion', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('suscripciones').select('*').eq('id_usuario', socioId).eq('estado', 'activo').maybeSingle(),
        supabase.from('rutinas').select('id, dia_semana, series, repeticiones, fecha_asignacion, ejercicios(nombre, grupo_muscular)').eq('id_usuario', socioId).order('fecha_asignacion', { ascending: false }),
        supabase.from('mediciones').select('*').eq('id_usuario', socioId).order('fecha_medicion', { ascending: false }),
        supabase.from('ejercicios').select('*').order('nombre')
      ]);

      setPerfil({ usuario: resUser.data, dieta: resDieta.data, suscripcion: resSub.data });
      setRutinas(resRutinas.data || []);
      setMediciones(resMediciones.data || []);
      setEjerciciosCatalogo(resEjercicios.data || []);
      
      if (resUser.data) setEditData({ nombre: resUser.data.nombre, email: resUser.data.email });
    } catch (err) {
      console.error("Error al sincronizar datos:", err);
    } finally {
      setLoading(false);
    }
  }, [socioId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleBaja = async () => {
    if (window.confirm("¿Confirmas la baja del socio?")) {
      try {
        await supabase.from('usuarios').update({ activo: false }).eq('id', socioId);
        if (onBack) onBack();
      } catch (err) { alert("Error al procesar la baja."); }
    }
  };

  const handleEditSocio = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('usuarios').update(editData).eq('id', socioId);
      setEditModalOpen(false);
      fetchData();
    } catch (err) { alert("Error al actualizar."); }
  };

  // --- EL ARREGLO DEL BOTÓN GUARDAR Y EL IMC ---
  const handleAddMedicion = async (e) => {
    e.preventDefault(); // Volvemos al funcionamiento normal
    try {
      const peso = parseFloat(newMedicion.peso_kg);
      const altura = parseFloat(newMedicion.altura_cm);
      let imcCalculado = null;

      // Calculamos el IMC aquí, de forma segura
      if (peso > 0 && altura > 0) {
        imcCalculado = (peso / Math.pow(altura / 100, 2)).toFixed(1);
      }

      const { error } = await supabase.from('mediciones').insert([{
        id_usuario: socioId,
        peso_kg: peso,
        altura_cm: altura,
        imc: imcCalculado,
        grasa_porcentaje: parseFloat(newMedicion.grasa_porcentaje),
        notas_monitor: newMedicion.notas_monitor
      }]);
      
      if (error) throw error;
      
      setIsMedicionModalOpen(false);
      setNewMedicion({ peso_kg: '', altura_cm: '', imc: '', grasa_porcentaje: '', notas_monitor: '' });
      fetchData();
    } catch (err) { 
      console.error("Error en BD:", err);
      alert("Error al registrar medición."); 
    }
  };

  const handleAddDieta = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('dietas').insert([{ ...newDieta, id_usuario: socioId }]);
      setIsDietaModalOpen(false);
      fetchData();
    } catch (err) { alert("Error al asignar dieta."); }
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
    } catch (err) { alert("Error al asignar rutina."); }
  };

  return {
    perfil, rutinas, mediciones, ejerciciosCatalogo, loading,
    isMedicionModalOpen, setIsMedicionModalOpen, isEditModalOpen, setEditModalOpen,
    isDietaModalOpen, setIsDietaModalOpen, isRutinaModalOpen, setIsRutinaModalOpen,
    newMedicion, setNewMedicion, editData, setEditData, newDieta, setNewDieta,
    newRutina, setNewRutina, handleBaja, handleEditSocio, handleAddMedicion, handleAddDieta, handleAddRutina
  };
};