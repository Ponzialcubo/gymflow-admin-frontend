import React from 'react';

export default function ClassesSchedule({ clases = [], onOpenFullSchedule }) {
  const formatTime = (ts) => new Date(ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/20 border border-slate-100 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Próximas Clases</h2>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Sesiones de hoy</p>
        </div>
        <span className="bg-blue-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-tighter">Live</span>
      </div>

      <div className="flex-1 space-y-3 mb-8">
        {clases && clases.length > 0 ? (
          clases.slice(0, 4).map((clase) => (
            <div key={clase.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:bg-white hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black text-blue-600 bg-white px-3 py-2 rounded-xl shadow-sm border border-blue-50">
                  {formatTime(clase.horario)}
                </span>
                <div>
                  <p className="text-sm font-black text-slate-800 leading-none">{clase.nombre_clase}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tight">{clase.monitor_encargado}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center">
            <span className="text-4xl block mb-4 opacity-30">🧘‍♂️</span>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sin clases hoy</p>
          </div>
        )}
      </div>

      <button 
        onClick={onOpenFullSchedule}
        className="w-full py-5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200"
      >
        Ver Horario Completo
      </button>
    </div>
  );
}