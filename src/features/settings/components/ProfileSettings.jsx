import React, { useState } from 'react';

export default function ProfileSettings({ user }) {
  // Simulamos los datos del usuario
  const [profile, setProfile] = useState({
    nombre: 'Administrador Principal',
    telefono: '+34 600 000 000',
    email: 'admin@gymflow.com',
    rol: 'SUPER ADMIN'
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Perfil actualizado correctamente.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
        {/* CABECERA Y AVATAR */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100 pb-10">
          
          {/* Avatar Premium con efecto Hover para cambiar foto */}
          <div className="relative group cursor-pointer shrink-0">
            <div className="w-28 h-28 bg-slate-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl overflow-hidden transition-all group-hover:scale-105">
              🧑‍💼
              {/* Overlay oscuro que aparece al pasar el ratón */}
              <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-2xl">📷</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">Gestión de Perfil</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Configura tu identidad de administrador</p>
          </div>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CAMPOS EDITABLES */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Nombre Completo</label>
              <input 
                type="text" 
                value={profile.nombre}
                onChange={(e) => setProfile({...profile, nombre: e.target.value})}
                className="w-full p-5 text-lg bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Teléfono de Contacto</label>
              <input 
                type="text" 
                value={profile.telefono}
                onChange={(e) => setProfile({...profile, telefono: e.target.value})}
                className="w-full p-5 text-lg bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800 tabular-nums"
                required
              />
            </div>

            {/* CAMPOS BLOQUEADOS (Read-only) */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Email de Acceso <span className="text-sm">🔒</span>
              </label>
              <input 
                type="email" 
                value={profile.email}
                readOnly
                className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-400 cursor-not-allowed"
                title="Para cambiar tu email contacta con soporte"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Rol de Sistema <span className="text-sm">🔒</span>
              </label>
              <input 
                type="text" 
                value={profile.rol}
                readOnly
                className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl outline-none font-black text-blue-400 cursor-not-allowed tracking-widest"
              />
            </div>

          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}