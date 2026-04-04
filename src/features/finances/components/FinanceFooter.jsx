import React from 'react';

export default function FinanceFooter({ total }) {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 xl:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-6 shrink-0 shadow-2xl">
      <div className="text-center md:text-left">
        <h4 className="text-xl xl:text-3xl font-black tracking-tight mb-2">Impacto Financiero Proyectado</h4>
        <p className="text-slate-400 text-xs xl:text-sm font-bold uppercase tracking-widest opacity-60">Estimación basada en membresías activas</p>
      </div>
      <div className="bg-white/10 px-10 py-6 rounded-[2rem] backdrop-blur-md border border-white/10 text-center shrink-0 w-full md:w-auto shadow-inner">
        <p className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Total Neto (Bruto)</p>
        <p className="text-4xl xl:text-6xl font-black text-white tracking-tighter">
          {Number(total || 0).toFixed(2)}€
        </p>
      </div>
    </div>
  );
}