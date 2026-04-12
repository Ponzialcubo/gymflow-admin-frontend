import React from 'react';

export default function FinanceKPIs({ stats }) {
  
  // Formateador profesional integrado para asegurar puntos y comas
  const formatValue = (val) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val || 0) + '€';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* CARD: INGRESOS */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-4 relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">📈</div>
          <span className="bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-black">+12%</span>
        </div>
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Ingresos Brutos (Mes)</p>
          {/* Aumentado a text-5xl */}
          <h4 className="text-5xl font-black text-slate-800 tracking-tighter">
            {formatValue(stats.ingresos)}
          </h4>
        </div>
      </div>

      {/* CARD: GASTOS */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-4 relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-2xl">📉</div>
          <span className="bg-rose-100 text-rose-600 px-4 py-1.5 rounded-full text-xs font-black">-5%</span>
        </div>
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Gastos Operativos</p>
          {/* Aumentado a text-5xl */}
          <h4 className="text-5xl font-black text-slate-800 tracking-tighter">
            {formatValue(stats.gastos)}
          </h4>
        </div>
      </div>

      {/* CARD: BENEFICIO NETO (Hero Card) */}
      <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-blue-900/20 flex flex-col gap-4 relative overflow-hidden group border border-slate-800">
        <div className="flex justify-between items-start relative z-10">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-2xl border border-blue-500/20">💎</div>
          <div className="w-24 h-24 bg-blue-600/10 rounded-full absolute -top-10 -right-10 blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <p className="text-[11px] font-black text-blue-400/60 uppercase tracking-[0.2em] mb-1">Beneficio Neto</p>
          {/* Aumentado a text-5xl y color blanco puro */}
          <h4 className="text-5xl font-black text-white tracking-tighter drop-shadow-sm">
            {formatValue(stats.neto)}
          </h4>
        </div>
        {/* Decoración de fondo para que se vea más premium */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl pointer-events-none"></div>
      </div>

    </div>
  );
}