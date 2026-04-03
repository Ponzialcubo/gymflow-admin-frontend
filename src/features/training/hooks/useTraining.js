import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useTraining = (onBack) => {
  const [socios, setSocios] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [loading, setLoading] = useState(false);
  
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [form, setForm] = useState({ 
    id_usuario: '', id_ejercicio: '', series: 3, repeticiones: 12 
  });

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [resS, resE] = await Promise.all([
          axios.get(`${API_URL}/usuarios`),
          axios.get(`${API_URL}/ejercicios`)
        ]);
        setSocios(resS.data);
        setEjercicios(resE.data);
        
        if(resS.data.length > 0 && resE.data.length > 0) {
          setForm(prev => ({
            ...prev,
            id_usuario: resS.data[0].id,
            id_ejercicio: resE.data[0].id
          }));
        }
      } catch (err) {
        setMensaje({ texto: '❌ Fallo en la conexión con la API', tipo: 'error' });
      }
    };
    fetchInitialData();
  }, []);

  const toggleDia = (dia) => {
    setDiasSeleccionados(prev => 
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (diasSeleccionados.length === 0) {
      setMensaje({ texto: '⚠️ Selecciona al menos un día', tipo: 'error' });
      return;
    }

    setLoading(true);
    try {
      // Operación Atómica Masiva
      await Promise.all(diasSeleccionados.map(dia => 
        axios.post(`${API_URL}/rutinas`, { ...form, dia_semana: dia })
      ));

      const socioNombre = socios.find(s => s.id == form.id_usuario)?.nombre;
      const ejercicioNombre = ejercicios.find(ex => ex.id == form.id_ejercicio)?.nombre;
      
      setRecientes(prev => [{
        id: Date.now(),
        socio: socioNombre,
        ejercicio: ejercicioNombre,
        dias: diasSeleccionados.join('-').substring(0, 10)
      }, ...prev].slice(0, 6));

      setMensaje({ texto: `✅ Planificación asignada con éxito`, tipo: 'success' });
      setDiasSeleccionados([]);
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
    } catch (err) {
      setMensaje({ texto: '❌ Error al guardar la rutina', tipo: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return {
    socios, ejercicios, recientes, mensaje, loading,
    diasSeleccionados, diasSemana, form, setForm,
    toggleDia, handleSubmit
  };
};