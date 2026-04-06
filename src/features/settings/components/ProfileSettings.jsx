import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase';

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    nombre: '',
    email: '',
    rol: '',
    estado: 'activo' // Columna que tienes en tu tabla
  });

  useEffect(() => {
    const getInitialData = async () => {
      try {
        setLoading(true);

        // 1. Obtener usuario de la sesión
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          console.error("No hay usuario autenticado");
          setLoading(false);
          return;
        }

        // 2. Buscar en tu tabla 'empleados'
        const { data: dbData, error: dbError } = await supabase
          .from('empleados')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (dbData) {
          setProfile({
            nombre: dbData.nombre || '',
            email: dbData.email || user.email,
            rol: dbData.rol || 'ADMIN',
            estado: dbData.estado || 'activo'
          });
        } else {
          // Si no existe, usamos los datos de la sesión
          setProfile(prev => ({
            ...prev,
            nombre: user.user_metadata?.full_name || 'Nuevo Administrador',
            email: user.email,
            rol: 'ADMIN'
          }));
        }
      } catch (error) {
        console.error("Error crítico:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // UPSERT ajustado a tus columnas: id, nombre, rol, email, estado
      const { error } = await supabase
        .from('empleados')
        .upsert({
          email: profile.email,
          nombre: profile.nombre,
          rol: profile.rol,
          estado: profile.estado
        }, { onConflict: 'email' });

      if (error) throw error;
      alert("✅ Perfil actualizado correctamente");
    } catch (error) {
      alert("Error al guardar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">
      Sincronizando identidad...
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
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

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* NOMBRE */}
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

            {/* ESTADO (Nueva columna detectada en tu imagen) */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Estado de Cuenta</label>
              <div className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-bold text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {profile.estado.toUpperCase()}
              </div>
            </div>

            {/* EMAIL */}
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

            {/* ROL */}
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