import React, { useState, useEffect } from 'react';
import { useSettings } from './hooks/useSettings'; // Ajusta la ruta correcta

export default function ProfileSettings() {
  // 1. Extraemos todo lo necesario del Hook maestro
  const { profile, loading, handleUpdateProfile } = useSettings();
  
  // 2. Estado local para editar antes de guardar
  const [localProfile, setLocalProfile] = useState({
    nombre: '',
    email: '',
    rol: 'ADMIN',
    estado: 'ACTIVO'
  });

  const [saving, setSaving] = useState(false);

  // 3. Sincronizamos el estado local cuando el hook termina de cargar
  useEffect(() => {
    if (!loading && profile.email) {
      setLocalProfile({
        nombre: profile.nombre || '',
        email: profile.email || '',
        rol: profile.rol || 'ADMIN', // Puedes ajustarlo si en DB guardas el rol del admin
        estado: 'ACTIVO'
      });
    }
  }, [profile, loading]);

  // 4. Función de guardado usando el Hook
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Le pasamos la data al hook para que él hable con Supabase
    await handleUpdateProfile({
      nombre: localProfile.nombre,
      email: localProfile.email
    });
    
    setSaving(false);
  };

  if (loading) {
    return <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">Cargando perfil...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
        {/* Cabecera */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100 pb-10">
          <div className="relative shrink-0">
            <div className="w-28 h-28 bg-slate-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl overflow-hidden">
              🧑‍💼
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">Gestión de Perfil</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">
              Bienvenido de nuevo, <span className="text-blue-600">{localProfile.nombre.split(' ')[0] || 'Admin'}</span>
            </p>
          </div>
        </div>

        <form onSubmit={onSubmitForm} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Nombre Completo */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Nombre Completo</label>
              <input 
                type="text" 
                value={localProfile.nombre}
                onChange={(e) => setLocalProfile({...localProfile, nombre: e.target.value})}
                className="w-full p-5 text-lg bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                placeholder="Escribe tu nombre..."
                required
              />
            </div>

            {/* Estado */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Estado de Cuenta</label>
              <div className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-bold text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {localProfile.estado}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Email de Acceso <span className="text-sm">🔒</span>
              </label>
              <input 
                type="email" 
                value={localProfile.email}
                readOnly
                className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-bold text-slate-400 cursor-not-allowed outline-none"
              />
              <p className="text-[10px] text-slate-400 font-bold mt-1 ml-1">El email solo se puede cambiar desde Supabase Auth.</p>
            </div>

            {/* Rol */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Rol de Sistema <span className="text-sm">🔒</span>
              </label>
              <input 
                type="text" 
                value={localProfile.rol.toUpperCase()}
                readOnly
                className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-black text-blue-400 cursor-not-allowed outline-none tracking-widest"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
      {mensaje && mensaje.texto && (
        <div className={`fixed bottom-10 right-10 p-5 rounded-2xl shadow-2xl border font-black text-[10px] uppercase tracking-widest z-50 animate-in slide-in-from-bottom-5 ${
          mensaje.tipo === 'success' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-red-500 text-white border-red-400'
        }`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}