import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

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
    setLoading(true);
    try {
      const [resP, resR, resM, resE] = await Promise.all([
        axios.get(`${API_URL}/socios/${socioId}/perfil`),
        axios.get(`${API_URL}/socios/${socioId}/rutinas-historial`),
        axios.get(`${API_URL}/socios/${socioId}/mediciones`),
        axios.get(`${API_URL}/ejercicios`) 
      ]);
      setPerfil(resP.data);
      setRutinas(resR.data);
      setMediciones(resM.data);
      setEjerciciosCatalogo(resE.data);
      setEditData({ nombre: resP.data.usuario.nombre, email: resP.data.usuario.email });
    } catch (err) {
      console.error("Error al sincronizar datos:", err);
    } finally {
      setLoading(false);
    }
  }, [socioId]);

  useEffect(() => {
    if (socioId) fetchData();
  }, [socioId, fetchData]);

  // --- MANEJADORES DE EVENTOS ---
  const handleBaja = async () => {
    if (window.confirm("¿Confirmas la baja del socio? No podrá volver a entrar a la App.")) {
      try {
        await axios.put(`${API_URL}/usuarios/${socioId}/baja`);
        if (onBack) onBack();
      } catch (err) { alert("Error al procesar la baja."); }
    }
  };

  const handleEditSocio = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/usuarios/${socioId}`, editData);
      setEditModalOpen(false);
      fetchData();
    } catch (err) { alert("Error al actualizar datos."); }
  };

  const handleAddMedicion = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/mediciones`, {
        id_usuario: socioId,
        peso_kg: parseFloat(newMedicion.peso_kg),
        grasa_porcentaje: parseFloat(newMedicion.grasa_porcentaje),
        notas_monitor: newMedicion.notas_monitor
      });
      setIsMedicionModalOpen(false);
      setNewMedicion({ peso_kg: '', grasa_porcentaje: '', notas_monitor: '' });
      fetchData();
    } catch (err) { alert("Error al registrar medición."); }
  };

  const handleAddDieta = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/dietas`, { ...newDieta, id_usuario: socioId });
      setIsDietaModalOpen(false);
      fetchData();
    } catch (err) { alert("Error al asignar dieta."); }
  };

  const handleAddRutina = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/rutinas`, { ...newRutina, id_usuario: socioId });
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