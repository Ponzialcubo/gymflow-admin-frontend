import React, { useState } from 'react';
import { useSettings } from './hooks/useSettings'; // Ajusta la ruta si es necesario

export default function SecuritySettings() {
  const { handleUpdatePassword } = useSettings();
  
  // Como Supabase Auth no requiere la contraseña actual si la sesión está activa, 
  // podríamos omitirla, pero la mantenemos por UX (da sensación de seguridad).
  const [pass, setPass] = useState({ current: '', new: '', confirm: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    
    // 1. Validaciones básicas front-end
    if (pass.new.length < 8) {
      alert("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }
    
    if (pass.new !== pass.confirm) {
      alert("Las contraseñas nuevas no coinciden.");
      return;
    }

    setIsUpdating(true);
    
    // 2. Llamada a Supabase mediante el Hook
    const success = await handleUpdatePassword(pass.new);
    
    // 3. Si todo va bien, limpiamos el formulario
    if (success) {
      setPass({ current: '', new: '', confirm: '' });
    }
    
    setIsUpdating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* TARJETA 1: CAMBIO DE CONTRASEÑA */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-10 border-b border-slate-100 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tight">Credenciales de Acceso</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Actualiza tu contraseña de administrador</p>
          </div>
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100">
            🔐
          </div>
        </div>

        <form onSubmit={onSubmitForm} className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            <div className="space-y-3 xl:col-span-1">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Contraseña Actual</label>
              <input 
                type="password" 
                className="w-full p-5 text-lg bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-800 font-bold transition-all text-slate-700 tracking-widest"
                placeholder="••••••••"
                value={pass.current}
                onChange={(e) => setPass({...pass, current: e.target.value})}
                required
              />
            </div>

            <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest ml-1 block">Nueva Contraseña</label>
                <input 
                  type="password" 
                  className="w-full p-5 text-lg bg-blue-50/30 border-2 border-blue-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-blue-800 tracking-widest"
                  placeholder="••••••••"
                  value={pass.new}
                  onChange={(e) => setPass({...pass, new: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  className="w-full p-5 text-lg bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-800 font-bold transition-all text-slate-700 tracking-widest"
                  placeholder="••••••••"
                  value={pass.confirm}
                  onChange={(e) => setPass({...pass, confirm: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-4 text-slate-500">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xl shrink-0">
                ⚠️
              </div>
              <p className="text-sm font-bold leading-relaxed max-w-md">
                Usa al menos <span className="font-black text-slate-700">8 caracteres</span>, combinando mayúsculas, minúsculas y números.
              </p>
            </div>
            
            <button 
              type="submit" 
              disabled={isUpdating}
              className={`w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all shrink-0 ${isUpdating ? 'opacity-50 pointer-events-none' : 'hover:bg-blue-600 active:scale-95'}`}
            >
              {isUpdating ? 'Actualizando...' : 'Actualizar Clave'}
            </button>
          </div>
        </form>
      </div>

      {/* TARJETA 2: CONTROL DE SESIONES (Se mantiene igual visualmente) */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Dispositivos Vinculados</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Controla desde dónde accedes</p>
          </div>
          <button 
            type="button" 
            onClick={() => alert("Función para revocar sesiones de Supabase Auth en desarrollo.")}
            className="px-6 py-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            Cerrar otras sesiones
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-200/60">
            <div className="text-5xl">💻</div>
            <div className="flex-1">
              <p className="text-xl font-black text-slate-800">MacBook Pro - Google Chrome</p>
              <p className="text-xs font-bold text-slate-400 mt-1">Madrid, España • IP: 192.168.1.34</p>
            </div>
            <div className="bg-emerald-50 text-emerald-600 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest border border-emerald-100">
              Sesión Actual
            </div>
          </div>
          
          <div className="flex items-center gap-6 p-6 bg-transparent rounded-[2rem] border border-slate-100">
            <div className="text-5xl opacity-50">📱</div>
            <div className="flex-1 opacity-70">
              <p className="text-xl font-black text-slate-800">iPhone 14 - Safari Mobile</p>
              <p className="text-xs font-bold text-slate-400 mt-1">Getafe, España • Hace 2 horas</p>
            </div>
          </div>
        </div>
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