import React, { useState } from 'react';

export default function SecuritySettings() {
  const [pass, setPass] = useState({ current: '', new: '', confirm: '' });

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-2">Seguridad</h3>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Protección de la cuenta de administrador</p>

      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña Actual</label>
          <input 
            type="password" 
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 font-bold"
            placeholder="••••••••"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
            <input 
              type="password" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 font-bold"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar</label>
            <input 
              type="password" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 font-bold"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl">
          <p className="text-[10px] font-black text-amber-600 uppercase mb-2">⚠️ Recomendación</p>
          <p className="text-[11px] text-amber-800/70 font-bold leading-relaxed">
            La contraseña debe contener al menos 8 caracteres, incluyendo números y símbolos especiales.
          </p>
        </div>

        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-red-600 transition-all">
          Actualizar Seguridad
        </button>
      </div>
    </div>
  );
}