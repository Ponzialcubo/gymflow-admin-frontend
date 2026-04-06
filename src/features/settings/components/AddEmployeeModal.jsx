import React, { useState } from 'react';
import { supabase } from '../../../config/supabase';

export default function AddEmployeeModal({ isOpen, onClose, onEmployeeAdded }) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'Entrenador'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 🎯 Guardamos en 'empleados'
      const { error } = await supabase
        .from('empleados')
        .insert([{
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password, // Asegúrate de tener esta columna en la DB
          rol: formData.rol,
          estado: 'activo'
        }]);

      if (error) throw error;
      
      alert("✅ Empleado registrado correctamente");
      onEmployeeAdded(); 
      onClose(); 
      
    } catch (error) {
      alert("Error al registrar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="bg-slate-50 p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Nuevo Empleado</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Credenciales para la App Móvil</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-black shadow-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
              <input 
                type="text" required
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                placeholder="Ej. Laura López"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Rol / Puesto</label>
              <select 
                value={formData.rol}
                onChange={(e) => setFormData({...formData, rol: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-700 cursor-pointer"
              >
                <option value="Entrenador">Entrenador Personal</option>
                <option value="Instructor">Instructor de Clases</option>
                <option value="Nutricionista">Nutricionista</option>
                <option value="Recepcion">Recepción</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email (Acceso App)</label>
              <input 
                type="email" required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                placeholder="entrenador@gymflow.com"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña (Acceso App)</label>
              <input 
                type="text" required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                placeholder="Genera una clave..."
              />
            </div>
          </div>

          <div className="pt-6 flex gap-4 justify-end">
            <button 
              type="button" 
              onClick={onClose}
              className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? 'Guardando...' : 'Crear Acceso'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}