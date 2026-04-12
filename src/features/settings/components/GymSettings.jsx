import React from 'react';
import { useSettings } from './hooks/useSettings'; // Ajusta la ruta

export default function GymSettings() {
  // Nos traemos toda la artillería pesada del Hook
  const { gymSettings, savingGym, handleChangeGymSettings, handleUpdateGymSettings, loading } = useSettings();

  if (loading) {
    return <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">Cargando parámetros de sede...</div>;
  }

  return (
    // Transformamos todo el contenedor en un FORM para usar submit nativo
    <form onSubmit={handleUpdateGymSettings} className="space-y-8 animate-in fade-in duration-500">
      
      {/* TARJETA 1: PLAN DE NEGOCIO */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-10 border-b border-slate-100 pb-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Estructura del Negocio</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Aforo y precios de las membresías</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Aforo Máximo</label>
            <div className="relative">
              <input 
                type="number" name="aforo_maximo"
                value={gymSettings.aforo_maximo} onChange={handleChangeGymSettings}
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xl outline-none focus:border-slate-800 transition-all text-slate-700" 
              />
              <span className="absolute right-5 top-5 font-bold text-slate-400">pers.</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Plan Basic</label>
            <div className="relative">
              <input 
                type="number" step="0.01" name="precio_basic"
                value={gymSettings.precio_basic} onChange={handleChangeGymSettings}
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xl outline-none focus:border-blue-500 transition-all text-slate-700" 
              />
              <span className="absolute right-5 top-5 font-black text-slate-400">€</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 block">Plan Estándar</label>
            <div className="relative">
              <input 
                type="number" step="0.01" name="precio_estandar"
                value={gymSettings.precio_estandar} onChange={handleChangeGymSettings}
                className="w-full p-5 bg-blue-50/50 border-2 border-blue-100 rounded-2xl font-black text-xl outline-none focus:border-blue-500 transition-all text-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
              />
              <span className="absolute right-5 top-5 font-black text-blue-600">€</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest ml-1 block">Plan Pro</label>
            <div className="relative">
              <input 
                type="number" step="0.01" name="precio_pro"
                value={gymSettings.precio_pro} onChange={handleChangeGymSettings}
                className="w-full p-5 bg-amber-50/30 border-2 border-amber-100 rounded-2xl font-black text-xl outline-none focus:border-amber-500 transition-all text-amber-700" 
              />
              <span className="absolute right-5 top-5 font-black text-amber-600">€</span>
            </div>
          </div>
        </div>
      </div>

      {/* TARJETA 2: HORARIOS (Mantenida intacta visualmente) */}
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
                <input type="time" defaultValue={dia === 'Domingos' ? '09:00' : '07:00'} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-slate-700 outline-none text-sm" />
                <span className="text-slate-300 font-bold">-</span>
                <input type="time" defaultValue={dia === 'Domingos' ? '14:00' : '23:00'} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-slate-700 outline-none text-sm" />
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
          <label className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-all">
            <div>
              <p className="text-lg font-black text-slate-700">Notificaciones Push</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Avisos automáticos a socios</p>
            </div>
            <div className="relative">
              <input type="checkbox" name="notificaciones_push" checked={gymSettings.notificaciones_push} onChange={handleChangeGymSettings} className="sr-only peer" />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>

          <label className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between cursor-pointer hover:border-red-200 transition-all group">
            <div>
              <p className="text-lg font-black text-slate-700 group-hover:text-red-600 transition-colors">Modo Mantenimiento</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Bloquear acceso a la App cliente</p>
            </div>
            <div className="relative">
              <input type="checkbox" name="modo_mantenimiento" checked={gymSettings.modo_mantenimiento} onChange={handleChangeGymSettings} className="sr-only peer" />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
            </div>
          </label>
        </div>

        {/* BOTÓN GUARDAR (Ahora es tipo Submit) */}
        <div className="pt-10 flex justify-end">
          <button 
            type="submit"
            disabled={savingGym}
            className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {savingGym ? 'Sincronizando...' : 'Guardar Ajustes'}
          </button>
        </div>
      </div>

    </form>
  );
}