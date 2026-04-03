import React from 'react';

export default function RecentPlansFeed({ recientes }) {
  return (
    <div className="bg-white border-t border-slate-100 p-8">
      <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Historial de Asignación Rápida
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recientes.length > 0 ? (
          recientes.map(r => (
            <div 
              key={r.id} 
              className="p-5 rounded-3xl border border-slate-100 flex items-center gap-4 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all animate-in fade-in zoom-in duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-[10px] shadow-sm">
                {r.socio ? r.socio.substring(0, 2).toUpperCase() : '??'}
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-tight">
                  {r.socio}
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">
                  {r.plan} • <span className="text-emerald-600">{r.kcal} KCAL</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-4 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-[10px] text-slate-400 font-bold italic text-center uppercase tracking-widest">
              No hay planes registrados en esta sesión de trabajo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}