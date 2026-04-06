import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase';

// Recibimos 'user' como prop (igual que lo hace tu Sidebar)
export default function ProfileSettings({ user }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    nombre: '',
    email: '',
    rol: 'ADMIN',
    estado: 'activo'
  });

  useEffect(() => {
    const fetchDBProfile = async () => {
      // Si no hay user por prop, no intentamos nada
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Buscamos en la tabla empleados usando el email que ya conocemos de la App
        const { data, error } = await supabase
          .from('empleados')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (data) {
          setProfile({
            nombre: data.nombre || user.nombre || '',
            email: data.email || user.email,
            rol: data.rol || user.rol || 'ADMIN',
            estado: data.estado || 'activo'
          });
        } else {
          // Si no está en la DB, rellenamos con lo que viene del login
          setProfile({
            nombre: user.nombre || 'Administrador',
            email: user.email,
            rol: user.rol || 'ADMIN',
            estado: 'activo'
          });
        }
      } catch (err) {
        console.error("Error cargando perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDBProfile();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from('empleados')
        .upsert({
          email: profile.email,
          nombre: profile.nombre,
          rol: profile.rol,
          estado: profile.estado
        }, { onConflict: 'email' });

      if (error) throw error;
      alert("✅ Datos guardados en la nube");
    } catch (err) {
      alert("Error al guardar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">
      Sincronizando con la base de datos...
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
        {/* CABECERA (La mantenemos igual) */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100 pb-10">
          <div className="relative group cursor-pointer shrink-0">
            <div className="w-28 h-28 bg-slate-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl overflow-hidden transition-all group-hover:scale-105">
              🧑‍💼
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">Gestión de Perfil</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Bienvenida de nuevo, {profile.nombre.split(' ')[0]}</p>
          </div>
        </div>

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
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Estado</label>
              <div className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-bold text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {profile.estado.toUpperCase()}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Email 🔒</label>
              <input type="text" value={profile.email} readOnly className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-bold text-slate-400 cursor-not-allowed" />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Rol 🔒</label>
              <input type="text" value={profile.rol} readOnly className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-black text-blue-400 cursor-not-allowed" />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button type="submit" disabled={saving} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50">
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}