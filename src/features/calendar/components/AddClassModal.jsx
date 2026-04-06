import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase';

export default function AddClassModal({ isOpen, onClose, onClassAdded }) {
  const [monitores, setMonitores] = useState([]);
  const [formData, setFormData] = useState({
    nombre_clase: '',
    monitor_encargado: '',
    capacidad_max: 20,
    fecha: '',
    hora: ''
  });

  useEffect(() => {
    const fetchMonitores = async () => {
      const { data } = await supabase.from('empleados').select('nombre').eq('estado', 'activo');
      setMonitores(data || []);
    };
    if (isOpen) fetchMonitores();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Combinar fecha y hora para Supabase
    const horario = `${formData.fecha}T${formData.hora}:00`;

    const { error } = await supabase.from('clases_colectivas').insert([{
      nombre_clase: formData.nombre_clase,
      monitor_encargado: formData.monitor_encargado,
      capacidad_max: formData.capacidad_max,
      horario: horario
    }]);

    if (!error) {
      onClassAdded();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-[3.5rem] p-12 w-full max-w-2xl shadow-2xl animate-in zoom-in duration-300 relative">
        <button onClick={onClose} className="absolute top-10 right-10 text-2xl text-slate-300">✕</button>
        
        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-8 border-b pb-6">Programar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Nombre de la Clase</label>
              <input 
                type="text" required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500" 
                placeholder="Ej: Yoga Flow"
                onChange={(e) => setFormData({...formData, nombre_clase: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Monitor</label>
              <select 
                required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500"
                onChange={(e) => setFormData({...formData, monitor_encargado: e.target.value})}
              >
                <option value="">Selecciona Monitor</option>
                {monitores.map(m => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fecha</label>
              <input 
                type="date" required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-slate-400"
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hora de Inicio</label>
              <input 
                type="time" required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-slate-400"
                onChange={(e) => setFormData({...formData, hora: e.target.value})}
              />
            </div>
          </div>
          
          <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
            Confirmar y Publicar
          </button>
        </form>
      </div>
    </div>
  );
}