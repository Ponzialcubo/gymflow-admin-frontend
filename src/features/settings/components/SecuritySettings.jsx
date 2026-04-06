import React, { useState } from 'react';

export default function SecuritySettings() {
  const [pass, setPass] = useState({ current: '', new: '', confirm: '' });

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (pass.new !== pass.confirm) {
      alert("Las contraseñas nuevas no coinciden.");
      return;
    }
    alert("Función de cambio de contraseña simulada.");
    setPass({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Seguridad de la Cuenta</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Protege tu acceso de administrador</p>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block">Contraseña Actual</label>
            <input 
              type="password" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 font-bold transition-all"
              placeholder="••••••••"
              value={pass.current}
              onChange={(e) => setPass({...pass, current: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block">Nueva Contraseña</label>
              <input 
                type="password" 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 font-bold transition-all"
                placeholder="••••••••"
                value={pass.new}
                onChange={(e) => setPass({...pass, new: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block">Confirmar Contraseña</label>
              <input 
                type="password" 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 font-bold transition-all"
                placeholder="••••••••"
                value={pass.confirm}
                onChange={(e) => setPass({...pass, confirm: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4 items-start mt-8">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">Requisitos de seguridad</p>
              <p className="text-[11px] text-amber-700/80 font-bold leading-relaxed">
                Usa al menos 8 caracteres, combinando mayúsculas, minúsculas y números. Te recomendamos no usar la misma contraseña que en otros sitios web.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-8">
            <button type="button" className="text-xs font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors">
              Cerrar resto de sesiones
            </button>
            <button type="submit" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
              Actualizar Clave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}