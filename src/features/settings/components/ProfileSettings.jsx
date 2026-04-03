import React, { useState } from 'react';

export default function ProfileSettings({ onUpdate }) {
  const [formData, setFormData] = useState({
    nombre: 'Admin GymFlow',
    email: 'admin@gymflow.com',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-6 mb-10">
        <div className="relative group">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-lg overflow-hidden">
            👤
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-all text-xs">
            📷
          </button>
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Gestión de Perfil</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configura tu identidad de administrador</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Nombre Completo</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Email de Acceso</label>
            <input 
              type="email" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>
        <button type="submit" className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}