import React from 'react';

export default function GymSettings({ settings, setSettings }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-2">Centro Deportivo</h3>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">Parámetros globales del negocio</p>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Nombre del Centro</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-emerald-500 transition-all"
              value={settings.gymName}
              onChange={(e) => setSettings({...settings, gymName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Divisa Principal</label>
            <select 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-emerald-500"
              value={settings.currency}
              onChange={(e) => setSettings({...settings, currency: e.target.value})}
            >
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dólar ($)</option>
              <option value="MXN">Peso Mexicano (MXN)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-700">Notificaciones Push</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Avisos automáticos a socios</p>
            </div>
            <input 
              type="checkbox" 
              className="w-6 h-6 accent-emerald-500"
              checked={settings.notifications}
              onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
            />
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-700">Modo Mantenimiento</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Bloquear acceso a la App</p>
            </div>
            <input 
              type="checkbox" 
              className="w-6 h-6 accent-red-500"
              checked={settings.maintenance}
              onChange={(e) => setSettings({...settings, maintenance: e.target.checked})}
            />
          </div>
        </div>
      </div>
    </div>
  );
}