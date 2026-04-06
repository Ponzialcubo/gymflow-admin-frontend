import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase'; 

export default function ProfileSettings({ user }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    nombre: '',
    telefono: '',
    email: '',
    rol: ''
  });

  // 1. CARGAR DATOS REALES AL MONTAR
  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        // Suponiendo que los datos del admin están en la tabla 'empleados' 
        // o una tabla 'perfiles' vinculada al ID de Auth
        const { data, error } = await supabase
          .from('empleados')
          .select('*')
          .eq('email', user?.email) // Buscamos por el email del usuario autenticado
          .single();

        if (data) {
          setProfile({
            nombre: data.nombre,
            telefono: data.telefono || '',
            email: data.email,
            rol: data.rol || 'ADMIN'
          });
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) getProfile();
  }, [user]);

  // 2. LOGICA DE GUARDADO REAL
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('empleados')
        .update({
          nombre: profile.nombre,
          telefono: profile.telefono,
          // El email y rol no los actualizamos por seguridad aquí
        })
        .eq('email', profile.email);

      if (error) throw error;
      alert("¡Perfil actualizado en la base de datos!");
    } catch (error) {
      alert("Error al actualizar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">
      Sincronizando perfil...
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
        {/* CABECERA */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100 pb-10">
          <div className="relative group cursor-pointer shrink-0">
            <div className="w-28 h-28 bg-slate-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl overflow-hidden transition-all group-hover:scale-105">
              🧑‍💼
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
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Email de Acceso <span className="text-sm">🔒</span>
              </label>
              <input 
                type="email" 
                value={profile.email}
                readOnly
                className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-400 cursor-not-allowed"
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
              disabled={saving}
              className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}