import React, { useState } from 'react';
import axios from 'axios';

export default function AddClientModal({ isOpen, onClose, onClientAdded }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: 'GymFlow2024!' 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3000/api/usuarios', formData);
      setFormData({ nombre: '', email: '', password: 'GymFlow2024!' });
      if (onClientAdded) onClientAdded();
      onClose();
    } catch (error) {
      console.error("Error al crear socio:", error);
      alert("Hubo un error al crear el socio. Revisa la consola.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
        
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-3">Alta de Socio</h2>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">GymFlow Pro Membership</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-sm font-black text-blue-600 uppercase tracking-widest ml-1">Nombre Completo</label>
            <input 
              required
              type="text" 
              className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-lg font-bold transition-all placeholder:text-slate-300"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Ej. Carlos DAM"
            />
          </div>

          <div>
            <label className="text-sm font-black text-blue-600 uppercase tracking-widest ml-1">Email Profesional</label>
            <input 
              required
              type="email" 
              className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-lg font-bold transition-all placeholder:text-slate-300"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="carlos@gymflow.com"
            />
          </div>
          
          <div className="flex gap-6 pt-6">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-5 text-slate-400 font-black text-sm uppercase tracking-[0.15em] hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-5 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 text-sm uppercase tracking-[0.15em] disabled:opacity-50 active:scale-95"
            >
              {isSubmitting ? 'Guardando...' : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}