import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExercise, setNewExercise] = useState({ 
    nombre: '', grupo_muscular: 'Pecho', descripcion: '', imagen_url: '' 
  });

  useEffect(() => { fetchExercises(); }, []);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/ejercicios`);
      setExercises(res.data);
    } catch (err) {
      console.error("Error al sincronizar catálogo:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/ejercicios`, newExercise);
      setIsModalOpen(false);
      setNewExercise({ nombre: '', grupo_muscular: 'Pecho', descripcion: '', imagen_url: '' });
      fetchExercises();
    } catch (err) { alert("Error al guardar."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este ejercicio?")) return;
    try {
      await axios.delete(`${API_URL}/ejercicios/${id}`);
      fetchExercises();
    } catch (err) { alert("Ejercicio en uso."); }
  };

  // Lógica de filtrado memorizada para optimizar rendimiento
  const filteredExercises = useMemo(() => {
    return exercises.filter(e => {
      const matchName = e.nombre?.toLowerCase().includes(filterName.toLowerCase());
      const matchMuscle = selectedMuscle === 'Todos' || 
                         e.grupo_muscular?.toLowerCase() === selectedMuscle.toLowerCase();
      return matchName && matchMuscle;
    });
  }, [exercises, filterName, selectedMuscle]);

  return {
    exercises: filteredExercises,
    loading,
    filterName, setFilterName,
    selectedMuscle, setSelectedMuscle,
    isModalOpen, setIsModalOpen,
    newExercise, setNewExercise,
    handleAddExercise,
    handleDelete
  };
};