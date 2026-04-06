import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../config/supabase';

export default function AddClassModal({ isOpen, onClose, onClassAdded, classToEdit }) {
  const [monitores, setMonitores] = useState([]);
  const [formData, setFormData] = useState({
    nombre_clase: '',
    monitor_encargado: '',
    capacidad_max: 20,
    fecha: '',
    hora: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar monitores y rellenar datos si estamos editando
  useEffect(() => {
    const fetchMonitores = async () => {
      const { data } = await supabase.from('empleados').select('nombre').eq('estado', 'activo');
      setMonitores(data || []);
    };
    
    if (isOpen) {
      fetchMonitores();
      
      if (classToEdit) {
        // Si estamos editando, formateamos la fecha y hora para rellenar los inputs
        const dateObj = new Date(classToEdit.horario);
        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const hh = String(dateObj.getHours()).padStart(2, '0');
        const mins = String(dateObj.getMinutes()).padStart(2, '0');

        setFormData({
          nombre_clase: classToEdit.nombre_clase,
          monitor_encargado: classToEdit.monitor_encargado,
          capacidad_max: classToEdit.capacidad_max,
          fecha: `${yyyy}-${mm}-${dd}`,
          hora: `${hh}:${mins}`
        });
      } else {
        // Limpiamos si es nueva
        setFormData({ nombre_clase: '', monitor_encargado: '', capacidad_max: 20, fecha: '', hora: '' });
      }
    }
  }, [isOpen, classToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const horario = `${formData.fecha}T${formData.hora}:00`;
    const dataToSave = {
      nombre_clase: formData.nombre_clase,
      monitor_encargado: formData.monitor_encargado,
      capacidad_max: formData.capacidad_max,
      horario: horario
    };

    try {
      if (classToEdit) {
        // UPDATE (Actualizar)
        const { error } = await supabase.from('clases_colectivas').update(dataToSave).eq('id', classToEdit.id);
        if (error) throw error;
      } else {
        // INSERT (Crear)
        const { error } = await supabase.from('clases_colectivas').insert([dataToSave]);
        if (error) throw error;
      }
      
      onClassAdded();
      onClose();
    } catch (error) {
      alert(`Error al ${classToEdit ? 'actualizar' : 'crear'}: ` + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-[3.5rem] p-12 w-full max-w-2xl shadow-2xl animate-in zoom-in duration-300 relative">
        <button onClick={onClose} className="absolute top-10 right-10 text-2xl text-slate-300 hover:text-slate-800 transition-colors">✕</button>
        
        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-8 border-b pb-6">
          {classToEdit ? 'Editar Sesión' : 'Programar Sesión'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Nombre de la Clase</label>
              <input 
                type="text" required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 text-slate-700" 
                placeholder="Ej: Yoga Flow"
                value={formData.nombre_clase}
                onChange={(e) => setFormData({...formData, nombre_clase: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Monitor Encargado</label>
              <select 
                required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 text-slate-700"
                value={formData.monitor_encargado}
                onChange={(e) => setFormData({...formData, monitor_encargado: e.target.value})}
              >
                <option value="">Selecciona Monitor</option>
                {monitores.map(m => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fecha</label>
              <input 
                type="date" required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-slate-400 text-slate-700"
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hora de Inicio</label>
              <input 
                type="time" required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-slate-400 text-slate-700"
                value={formData.hora}
                onChange={(e) => setFormData({...formData, hora: e.target.value})}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 mt-4"
          >
            {isSubmitting ? 'Guardando...' : (classToEdit ? 'Actualizar Sesión' : 'Confirmar y Publicar')}
          </button>
        </form>
      </div>
    </div>
  );
}