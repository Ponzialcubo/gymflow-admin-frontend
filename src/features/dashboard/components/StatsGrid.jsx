import React from 'react';

export default function StatsGrid({ stats, onOpenAvisosList }) {
  const desglose = stats?.desglosePlanes || {};
  const planes = Object.entries(desglose);

  // Formateador profesional
  const formatMoney = (val) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(val || 0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      
      {/* 1. Comunidad Activa */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Comunidad Activa</p>
            <h3 className="text-6xl font-black text-slate-900 tracking-tighter">
              {stats?.sociosActivos || 0}
            </h3>
          </div>
          <span className="text-5xl opacity-20">👥</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {planes.map(([nombrePlan, cantidad], idx) => (
            <span key={idx} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase border border-slate-100">
              {cantidad} {nombrePlan}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Facturación (CORREGIDA) */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Facturación Abril</p>
            <h3 className="text-6xl font-black text-slate-900 tracking-tighter">
              {formatMoney(stats?.ingresosMensuales)}
            </h3>
          </div>
          <span className="text-5xl opacity-20">💰</span>
        </div>
        <div className="w-full mt-4">
          <div className="flex justify-between text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">
            <span>Mes en curso</span>
            <span>Objetivo: 90%</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] w-[90%] transition-all duration-1000"></div>
          </div>
        </div>
      </div>

      {/* 3. Tablón de Avisos */}
      <button 
        onClick={onOpenAvisosList}
        className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-blue-900/20 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 text-left group border border-slate-800"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Comunicaciones</p>
            <h3 className="text-6xl font-black text-white tracking-tighter group-hover:text-blue-300">Tablón</h3>
          </div>
          <span className="text-5xl group-hover:rotate-12 transition-transform">📣</span>
        </div>
        <div className="w-full">
          <p className="text-xs font-black text-blue-400/60 uppercase tracking-widest mb-3 flex items-center gap-2">
            Ver circulares <span className="group-hover:translate-x-2 transition-transform">→</span>
          </p>
          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] w-[100%]"></div>
          </div>
        </div>
      </button>
      
    </div>
  );
}