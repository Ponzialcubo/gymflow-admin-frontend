import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase';

export default function ProfileSettings({ user }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Inicializamos con los datos que ya tenemos del login
  const [profile, setProfile] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    rol: user?.rol || 'ADMIN',
    estado: 'ACTIVO'
  });

  useEffect(() => {
    const fetchDBProfile = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // CAMBIO CLAVE: Ahora consultamos la tabla 'usuarios'
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (data) {
          setProfile({
            nombre: data.nombre || user.nombre,
            email: data.email || user.email,
            rol: data.rol || user.rol || 'ADMIN',
            estado: 'ACTIVO' 
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
      // Guardamos los cambios también en la tabla 'usuarios'
      const { error } = await supabase
        .from('usuarios')
        .update({
          nombre: profile.nombre,
          rol: profile.rol
        })
        .eq('email', profile.email);

      if (error) throw error;
      alert("✅ ¡Perfil actualizado correctamente!");
    } catch (err) {
      alert("Error al guardar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
        {/* Cabecera con saludo dinámico */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100 pb-10">
          <div className="relative shrink-0">
            <div className="w-28 h-28 bg-slate-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl overflow-hidden">
              🧑‍💼
            </div>
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">Gestión de Perfil</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">
              Bienvenida de nuevo, {profile.nombre ? profile.nombre.split(' ')[0] : 'Admin'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Nombre Completo */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Nombre Completo</label>
              <input 
                type="text" 
                value={profile.nombre}
                onChange={(e) => setProfile({...profile, nombre: e.target.value})}
                className="w-full p-5 text-lg bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                placeholder="Escribe tu nombre..."
                required
              />
            </div>

            {/* Estado de Cuenta */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Estado de Cuenta</label>
              <div className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-bold text-emerald-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {profile.estado}
              </div>
            </div>

            {/* Email (Bloqueado) */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Email de Acceso <span className="text-sm">🔒</span>
              </label>
              <input 
                type="email" 
                value={profile.email}
                readOnly
                className="w-full p-5 text-lg bg-slate-50/50 border-2 border-slate-100 rounded-2xl font-bold text-slate-400 cursor-not-allowed outline-none"
              />
            </div>

            {/* Rol (Bloqueado) */}
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                Rol de Sistema <span className="text-sm">🔒</span>
              </label>
              <input 
                type="text" 
                value={profile.rol.toUpperCase()}
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
    </div>
  );
}