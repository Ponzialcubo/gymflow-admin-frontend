import React from 'react';

export default function FinanceKPIs({ stats }) {
  
  const formatValue = (val) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val || 0) + '€';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* CARD: INGRESOS */}
      <div className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-6 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200/50">
        {/* Destello de fondo al hacer hover */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-emerald-100/50 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
            📈
          </div>
          <span className="bg-emerald-500 text-white px-5 py-2 rounded-full text-xs font-black shadow-lg shadow-emerald-500/30 group-hover:animate-bounce">
            +12%
          </span>
        </div>
        
        <div className="relative z-10">
          <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2 group-hover:text-emerald-500 transition-colors">Ingresos Totales</p>
          <h4 className="text-5xl font-black text-slate-800 tracking-tighter transition-all duration-500 group-hover:tracking-tight">
            {formatValue(stats.ingresos)}
          </h4>
        </div>
      </div>

      {/* CARD: GASTOS */}
      <div className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col gap-6 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-200/50">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-rose-100/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            📉
          </div>
          <span className="bg-rose-500 text-white px-5 py-2 rounded-full text-xs font-black shadow-lg shadow-rose-500/30">
            -5%
          </span>
        </div>
        
        <div className="relative z-10">
          <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2 group-hover:text-rose-500 transition-colors">Gastos Operativos</p>
          <h4 className="text-5xl font-black text-slate-800 tracking-tighter transition-all duration-500 group-hover:tracking-tight">
            {formatValue(stats.gastos)}
          </h4>
        </div>
      </div>

      {/* CARD: BENEFICIO NETO (Hero Card) */}
      <div className="group bg-slate-900 p-10 rounded-[3rem] shadow-2xl shadow-blue-900/40 flex flex-col gap-6 relative overflow-hidden transition-all duration-500 hover:scale-[1.02] border border-slate-800 hover:border-blue-500/50">
        {/* Glow animado de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] transition-all duration-700 group-hover:bg-blue-600/40 group-hover:scale-125"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:border-blue-500/60">
            💎
          </div>
          <div className="px-5 py-2 rounded-full text-[10px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest">
            Neto Final
          </div>
        </div>
        
        <div className="relative z-10">
          <p className="text-[12px] font-black text-blue-400/60 uppercase tracking-[0.25em] mb-2 group-hover:text-blue-300 transition-colors">Beneficio Disponible</p>
          <h4 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl group-hover:scale-[1.02] origin-left transition-transform">
            {formatValue(stats.neto)}
          </h4>
        </div>

        {/* Rayo de luz pasando (Efecto Shine) */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-40 group-hover:animate-shine" />
      </div>

    </div>
  );
}