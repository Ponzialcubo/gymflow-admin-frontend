import React, { useState } from 'react';

export default function ProfileSettings({ user }) {
  const [formData, setFormData] = useState({
    nombre: user?.nombre || 'Administrador Principal',
    email: user?.email || 'admin@gymflow.com',
    telefono: '+34 600 000 000',
    rol: 'Super Admin'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simular guardado
    setTimeout(() => {
      setIsSaving(false);
      alert("Perfil actualizado correctamente");
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* TARJETA 1: IDENTIDAD */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="flex items-start gap-8 mb-10 border-b border-slate-100 pb-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl shadow-inner border-4 border-white">
              🧑‍💼
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs border-2 border-white hover:bg-blue-700 transition-colors cursor-pointer" title="Cambiar foto">
              📷
            </button>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Gestión de Perfil</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Configura tu identidad de administrador</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Campo Nombre */}
            <div>
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 mb-2 block">Nombre Completo</label>
              <input 
                type="text" 
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-base font-bold transition-all text-slate-700"
              />
            </div>

            {/* Campo Email */}
            <div>
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 mb-2 block">Email de Acceso</label>
              <input 
                type="email" 
                value={formData.email}
                disabled // El email de login no suele cambiarse aquí fácilmente
                className="w-full p-4 bg-slate-100/50 border-2 border-slate-100 rounded-2xl outline-none text-base font-bold text-slate-400 cursor-not-allowed"
              />
            </div>

            {/* Campo Teléfono */}
            <div>
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 mb-2 block">Teléfono de Contacto</label>
              <input 
                type="tel" 
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-base font-bold transition-all text-slate-700"
              />
            </div>

            {/* Campo Rol (Solo lectura) */}
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Rol de Sistema</label>
              <input 
                type="text" 
                value={formData.rol}
                disabled
                className="w-full p-4 bg-slate-100/50 border-2 border-slate-100 rounded-2xl outline-none text-base font-bold text-slate-400 cursor-not-allowed uppercase"
              />
            </div>

          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit"
              disabled={isSaving}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}