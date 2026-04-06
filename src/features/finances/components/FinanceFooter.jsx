import React from 'react';

export default function FinanceFooter({ total }) {
  return (
    // Padding aumentado muchísimo para darle "cuerpo"
    <div className="bg-slate-900 rounded-[2.5rem] p-6 xl:p-8 text-white flex justify-between items-center gap-6 shrink-0 shadow-2xl">
      <div>
        {/* Título más grande */}
        <h4 className="text-3xl xl:text-4xl font-black tracking-tight leading-none mb-2">Impacto Proyectado</h4>
        <p className="text-slate-400 text-xs xl:text-sm font-bold uppercase opacity-60">Basado en membresías activas</p>
      </div>
      
      {/* Caja interior más ancha y espaciosa */}
      <div className="bg-white/10 px-8 py-4 rounded-3xl backdrop-blur-md border border-white/10 text-center shadow-inner">
        <p className="text-xs xl:text-sm font-black text-blue-400 uppercase tracking-widest mb-1">Total Neto</p>
        <p className="text-5xl xl:text-6xl font-black text-white tracking-tighter leading-none">
          {Number(total || 0).toFixed(2)}€
        </p>
      </div>
    </div>
  );
}