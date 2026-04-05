import React from 'react';

export default function FinanceFooter({ total }) {
  return (
    // Reducimos un pelín el padding exterior (p-4) para compensar la letra más grande
    <div className="bg-slate-900 rounded-[2rem] p-4 xl:p-5 text-white flex justify-between items-center gap-4 shrink-0 shadow-2xl">
      <div>
        {/* Letra más grande, pero con leading-none para que no ocupe más alto */}
        <h4 className="text-xl xl:text-2xl font-black tracking-tight leading-none mb-1">Impacto Proyectado</h4>
        <p className="text-slate-400 text-[11px] xl:text-xs font-bold uppercase opacity-60">Basado en membresías activas</p>
      </div>
      {/* Reducimos el padding vertical interior (py-2 en vez de py-3) */}
      <div className="bg-white/10 px-6 py-2 rounded-2xl backdrop-blur-md border border-white/10 text-center shadow-inner">
        <p className="text-[10px] xl:text-xs font-black text-blue-400 uppercase tracking-widest mb-0.5">Total Neto</p>
        <p className="text-4xl xl:text-5xl font-black text-white tracking-tighter leading-none">
          {Number(total || 0).toFixed(2)}€
        </p>
      </div>
    </div>
  );
}