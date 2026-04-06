import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase';

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    nombre: '',
    email: '',
    rol: 'ADMIN',
    estado: 'activo'
  });

  useEffect(() => {
    // Definimos la función de carga
    const loadSessionAndProfile = async () => {
      try {
        setLoading(true);

        // 1. Obtenemos la sesión actual (getSession es más rápido para el arranque)
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          await fetchUserData(session.user.email);
        } else {
          // 2. Si no hay sesión inmediata, escuchamos cambios (por si está cargando)
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            if (currentSession) {
              await fetchUserData(currentSession.user.email);
              subscription.unsubscribe(); // Dejamos de escuchar una vez lo tengamos
            } else {
              setLoading(false); // Definitivamente no hay nadie logueado
            }
          });
        }
      } catch (error) {
        console.error("Error en el arranque:", error);
        setLoading(false);
      }
    };

    // Función interna para buscar en tu tabla de empleados
    const fetchUserData = async (email) => {
      const { data, error } = await supabase
        .from('empleados')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (data) {
        setProfile({
          nombre: data.nombre || '',
          email: data.email,
          rol: data.rol || 'ADMIN',
          estado: data.estado || 'activo'
        });
      } else {
        setProfile(prev => ({ ...prev, email: email }));
      }
      setLoading(false);
    };

    loadSessionAndProfile();
  }, []);

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
      alert("✅ Perfil guardado");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">
      Conectando con el núcleo...
    </div>
  );

  // Si después de cargar no tenemos email, es que la sesión realmente no existe
  if (!profile.email) return (
    <div className="p-20 text-center font-black text-red-400 uppercase tracking-widest">
      Sesión no encontrada. Por favor, vuelve a loguearte.
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100 pb-10">
          <div className="w-28 h-28 bg-slate-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl">
            🧑‍💼
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">Gestión de Perfil</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Configura tu identidad de administrador</p>
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
                placeholder="Escribe tu nombre..."
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
              <input type="text" value={profile.rol} readOnly className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-bold text-blue-400 cursor-not-allowed tracking-widest" />
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