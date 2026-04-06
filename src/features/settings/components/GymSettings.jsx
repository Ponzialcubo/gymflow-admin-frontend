import React from 'react';

export default function GymSettings({ settings, setSettings }) {
  // Manejador temporal para simular guardado (hasta que lo conectes a Supabase)
  const handleSave = (e) => {
    e.preventDefault();
    alert("Configuración del centro guardada.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* TARJETA 1: DATOS DEL CENTRO */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Centro Deportivo</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Parámetros globales del negocio</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 block">Nombre Comercial</label>
              <input 
                type="text" 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all text-slate-700"
                value={settings?.gymName || ''}
                onChange={(e) => setSettings({...settings, gymName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 block">Divisa Principal</label>
              <select 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 text-slate-700 cursor-pointer"
                value={settings?.currency || 'EUR'}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
              >
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dólar ($)</option>
                <option value="MXN">Peso Mexicano (MXN)</option>
                <option value="GBP">Libra Esterlina (£)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Capacidad Máxima (Aforo)</label>
              <input 
                type="number" 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-slate-300 transition-all text-slate-700"
                defaultValue={100}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Zona Horaria</label>
              <select className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold outline-none focus:border-slate-300 text-slate-700 cursor-pointer">
                <option>Europe/Madrid (GMT+1)</option>
                <option>America/Mexico_City (GMT-6)</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      {/* TARJETA 2: PREFERENCIAS DEL SISTEMA */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Opciones del Sistema</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Automatizaciones y acceso</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Toggle Notificaciones */}
          <label className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-700">Notificaciones Push</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Avisos automáticos a socios</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings?.notifications || false}
                onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>

          {/* Toggle Mantenimiento */}
          <label className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between cursor-pointer hover:border-red-200 transition-all group">
            <div>
              <p className="text-sm font-black text-slate-700 group-hover:text-red-600 transition-colors">Modo Mantenimiento</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Bloquear acceso a la App cliente</p>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={settings?.maintenance || false}
                onChange={(e) => setSettings({...settings, maintenance: e.target.checked})}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </div>
          </label>
        </div>

        <div className="pt-8 flex justify-end">
          <button onClick={handleSave} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
            Guardar Ajustes
          </button>
        </div>
      </div>
    </div>
  );
}