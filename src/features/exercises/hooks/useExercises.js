import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; // Ajusta los niveles según tu carpeta real

export const useExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newExercise, setNewExercise] = useState({
    nombre: '',
    grupo_muscular: 'Pecho',
    descripcion: '',
    imagen_url: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Usamos useCallback para que la función sea estable y no de problemas en el useEffect
  const fetchExercises = useCallback(async () => {
    try {
      setLoading(true);
      // SELECT * FROM ejercicios ORDER BY nombre ASC
      const { data, error } = await supabase
        .from('ejercicios')
        .select('*')
        .order('nombre', { ascending: true });

      if (error) throw error;
      setExercises(data || []);
    } catch (err) {
      console.error("Error al sincronizar catálogo con Supabase:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 
    fetchExercises(); 
  }, [fetchExercises]);

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      // INSERT INTO ejercicios (...)
      const { error } = await supabase
        .from('ejercicios')
        .insert([newExercise]);

      if (error) throw error;

      setIsModalOpen(false);
      setNewExercise({ nombre: '', grupo_muscular: 'Pecho', descripcion: '', imagen_url: '' });
      fetchExercises();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      return;
    }
    setDeleteConfirmId(null);
    try {
      const { error } = await supabase
        .from('ejercicios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchExercises();
    } catch (err) {
      setErrorMsg("No se puede eliminar: ejercicio en uso");
      console.error(err);
    }
  };

  // Mantenemos tu lógica de filtrado memorizada (¡Muy bien tirado esto!)
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
    handleDelete,
    errorMsg, setErrorMsg,
    deleteConfirmId, setDeleteConfirmId
  };
};