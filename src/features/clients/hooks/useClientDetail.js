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

  // --- LA NUEVA FUNCIÓN DE BAJA LÓGICA ---
  const handleBaja = async () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres dar de baja a este socio? \nSe le denegará el acceso a la app móvil, pero conservarás su historial."
    );
    
    if (!confirmacion) return;

    try {
      // 1. Cancelamos sus suscripciones activas
      const { error: errorSub } = await supabase
        .from('suscripciones')
        .update({ estado: 'cancelado' })
        .eq('id_usuario', socioId)
        .eq('estado', 'activo');

      if (errorSub) console.warn("No se pudo cancelar suscripción:", errorSub);

      // 2. Lo marcamos como inactivo (Baja Lógica)
      const { error: errorUser } = await supabase
        .from('usuarios')
        .update({ activo: false })
        .eq('id', socioId);

      if (errorUser) throw errorUser;

      alert("✅ Socio dado de baja correctamente.");
      
      // 3. Volvemos a la pantalla principal
      if (onBack) onBack();

    } catch (error) {
      console.error("Error al dar de baja:", error);
      alert("Hubo un error al procesar la baja: " + error.message);
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

  const handleAddMedicion = async (e) => {
    e.preventDefault(); 
    try {
      const peso = parseFloat(newMedicion.peso_kg);
      const altura = parseFloat(newMedicion.altura_cm);
      let imcCalculado = null;

      if (peso > 0 && altura > 0) {
        // Aseguramos que el IMC se mande como número y no como string
        imcCalculado = parseFloat((peso / Math.pow(altura / 100, 2)).toFixed(1));
      }

      // --- 🛡️ ESCUDOS DE DATOS ---
      // Si la grasa está vacía, mandamos null en vez de NaN
      const grasa = newMedicion.grasa_porcentaje ? parseFloat(newMedicion.grasa_porcentaje) : null;
      // Si las notas están vacías, mandamos null
      const notas = newMedicion.notas_monitor ? newMedicion.notas_monitor.trim() : null;

      // Imprimimos en consola para ver exactamente qué estamos mandando
      const payload = {
        id_usuario: socioId,
        peso_kg: peso,
        altura_cm: altura,
        imc: imcCalculado,
        grasa_porcentaje: grasa,
        notas_monitor: notas
      };
      console.log("📦 Datos listos para Supabase:", payload);

      const { error } = await supabase.from('mediciones').insert([payload]);
      
      if (error) throw error; // Si falla, salta al catch de abajo
      
      setIsMedicionModalOpen(false);
      setNewMedicion({ peso_kg: '', altura_cm: '', imc: '', grasa_porcentaje: '', notas_monitor: '' });
      fetchData();
    } catch (err) { 
      // Aquí está el truco: Imprimimos el error REAL de la base de datos
      console.error("🔥 Error EXACTO de Supabase:", err);
      alert(`Error al registrar: ${err.message || "Revisa la consola F12"}`); 
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