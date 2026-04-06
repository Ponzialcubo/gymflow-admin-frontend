import React from 'react';

export default function FinanceFooter({ total }) {
  return (
    // Reducimos el padding de p-8 a p-5/p-6
    <div className="bg-slate-900 rounded-[2rem] p-5 xl:p-6 text-white flex justify-between items-center gap-5 shrink-0 shadow-2xl">
      <div>
        {/* Bajamos de 4xl a 3xl */}
        <h4 className="text-2xl xl:text-3xl font-black tracking-tight leading-none mb-2">Impacto Proyectado</h4>
        <p className="text-slate-400 text-[11px] xl:text-xs font-bold uppercase opacity-60">Basado en membresías activas</p>
      </div>
      
      {/* Caja interior reajustada */}
      <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center shadow-inner">
        <p className="text-[10px] xl:text-xs font-black text-blue-400 uppercase tracking-widest mb-1">Total Neto</p>
        <p className="text-4xl xl:text-5xl font-black text-white tracking-tighter leading-none">
          {Number(total || 0).toFixed(2)}€
        </p>
      </div>
    </div>
  );
}