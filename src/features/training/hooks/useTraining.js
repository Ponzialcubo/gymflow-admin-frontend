import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../config/supabase'; // Ajusta la ruta según tu estructura

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

  // Carga inicial de datos
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [resS, resE] = await Promise.all([
          supabase.from('usuarios').select('id, nombre').eq('rol', 'socio').eq('activo', true).order('nombre'),
          supabase.from('ejercicios').select('id, nombre').order('nombre')
        ]);

        if (resS.error) throw resS.error;
        if (resE.error) throw resE.error;

        setSocios(resS.data || []);
        setEjercicios(resE.data || []);
        
        if(resS.data?.length > 0 && resE.data?.length > 0) {
          setForm(prev => ({
            ...prev,
            id_usuario: resS.data[0].id,
            id_ejercicio: resE.data[0].id
          }));
        }
      } catch (err) {
        setMensaje({ texto: '❌ Fallo al conectar con Supabase', tipo: 'error' });
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
      // PREPARACIÓN DE LA INSERCIÓN MASIVA
      // Creamos un array de objetos, uno por cada día seleccionado
      const nuevasRutinas = diasSeleccionados.map(dia => ({
        id_usuario: form.id_usuario,
        id_ejercicio: form.id_ejercicio,
        series: parseInt(form.series),
        repeticiones: form.repeticiones.toString(), // Por si acaso es un varchar en tu DB
        dia_semana: dia
      }));

      // Una sola petición a Supabase para insertar todo el array
      const { error } = await supabase
        .from('rutinas')
        .insert(nuevasRutinas);

      if (error) throw error;

      // Feedback visual para el historial reciente
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
      console.error(err);
      setMensaje({ texto: '❌ Error al guardar la rutina: ' + err.message, tipo: 'error' });
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