import React from 'react';

export default function FinanceKPIs({ stats }) {
  // Extraemos los valores precalculados desde el hook (con valores por defecto por seguridad)
  const { ingresos = 0, gastos = 0, neto = 0 } = stats || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* INGRESOS */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            📈
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg">+12%</span>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ingresos Brutos (Mes)</p>
        <p className="text-4xl font-black text-slate-800">{ingresos.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
      </div>

      {/* GASTOS */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            📉
          </div>
          <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg">-5%</span>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gastos Operativos</p>
        <p className="text-4xl font-black text-slate-800">{gastos.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
      </div>

      {/* NETO (DARK MODE) */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
            💎
          </div>
        </div>
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 relative z-10">Beneficio Neto</p>
        <p className="text-4xl font-black text-white relative z-10">{neto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
      </div>

    </div>
  );
}