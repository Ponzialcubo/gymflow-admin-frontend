import React, { useState } from 'react';
import { supabase } from '../../../config/supabase';

export default function AddEmployeeModal({ isOpen, onClose, onEmployeeAdded }) {
  const [formData, setFormData] = useState({ nombre: '', rol: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('empleados')
        .insert([
          { 
            nombre: formData.nombre, 
            rol: formData.rol, 
            email: formData.email,
            estado: 'activo' // Por defecto entra activo
          }
        ]);

      if (error) throw error;
      
      // Si va bien, cerramos el modal, limpiamos el formulario y recargamos la lista
      setFormData({ nombre: '', rol: '', email: '' });
      onEmployeeAdded(); 
      onClose();
    } catch (error) {
      alert("Error al crear empleado: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[200] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-2xl shadow-2xl animate-in zoom-in duration-300 relative">
        
        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-2xl text-slate-300 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>

        <div className="mb-8 border-b border-slate-100 pb-6">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Nuevo Empleado</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Alta en el sistema GymFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 block">Nombre Completo</label>
            <input 
              type="text" 
              required
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all text-slate-700"
              placeholder="Ej: Marcos Pérez"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 block">Especialidad / Puesto</label>
            <input 
              type="text" 
              required
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all text-slate-700"
              placeholder="Ej: Entrenador Personal, Recepción..."
              value={formData.rol}
              onChange={(e) => setFormData({...formData, rol: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 block">Correo de Acceso</label>
            <input 
              type="email" 
              required
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all text-slate-700"
              placeholder="Ej: marcos@gymflow.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="pt-6 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Dar de Alta'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}