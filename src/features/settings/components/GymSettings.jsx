import React from 'react';

export default function GymSettings({ settings, setSettings }) {
  const handleSave = (e) => {
    e.preventDefault();
    alert("Configuración del centro guardada con éxito.");
    // Aquí en el futuro enviarás los datos a Supabase
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* TARJETA 1: PLAN DE NEGOCIO */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-10 border-b border-slate-100 pb-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Plan de Negocio</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Reglas, aforo y precios base</p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Aforo Máximo</label>
              <div className="relative">
                <input 
                  type="number" 
                  defaultValue={100} 
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xl outline-none focus:border-blue-500 transition-all text-slate-700" 
                />
                <span className="absolute right-5 top-5 font-bold text-slate-400">personas</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 block">Cuota Mensual Base</label>
              <div className="relative">
                <input 
                  type="number" 
                  defaultValue={39.90} 
                  step="0.01"
                  className="w-full p-5 bg-blue-50/50 border-2 border-blue-100 rounded-2xl font-black text-xl outline-none focus:border-blue-500 transition-all text-blue-700" 
                />
                <span className="absolute right-5 top-5 font-black text-blue-600">€</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Precio Matrícula</label>
              <div className="relative">
                <input 
                  type="number" 
                  defaultValue={15.00} 
                  step="0.01"
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xl outline-none focus:border-slate-400 transition-all text-slate-700" 
                />
                <span className="absolute right-5 top-5 font-black text-slate-400">€</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* TARJETA 2: HORARIOS OPERATIVOS */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-10 border-b border-slate-100 pb-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Horario Operativo</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Apertura y cierre del centro</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Lunes a Viernes', 'Sábados', 'Domingos'].map((dia) => (
            <div key={dia} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{dia}</p>
              <div className="flex items-center gap-3">
                <input 
                  type="time" 
                  defaultValue={dia === 'Domingos' ? '09:00' : '07:00'} 
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-slate-700 outline-none focus:border-blue-500 text-sm" 
                />
                <span className="text-slate-300 font-bold">-</span>
                <input 
                  type="time" 
                  defaultValue={dia === 'Domingos' ? '14:00' : '23:00'} 
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-slate-700 outline-none focus:border-blue-500 text-sm" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TARJETA 3: SISTEMA Y APP */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-10 border-b border-slate-100 pb-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Sistema y App Móvil</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Automatizaciones y experiencia del socio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Toggle Notificaciones */}
          <label className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-all">
            <div>
              <p className="text-lg font-black text-slate-700">Notificaciones Push</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Avisos automáticos a socios</p>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>

          {/* Toggle Mantenimiento */}
          <label className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between cursor-pointer hover:border-red-200 transition-all group">
            <div>
              <p className="text-lg font-black text-slate-700 group-hover:text-red-600 transition-colors">Modo Mantenimiento</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Bloquear acceso a la App cliente</p>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
            </div>
          </label>
        </div>

        {/* Botón de Guardar General */}
        <div className="pt-10 flex justify-end">
          <button onClick={handleSave} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">
            Guardar Ajustes
          </button>
        </div>
      </div>

    </div>
  );
}