import React from 'react';

export default function FinanceFooter({ total }) {
  return (
    <div className="bg-slate-900 rounded-[2rem] xl:rounded-[2.5rem] p-6 xl:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
      <div className="text-center md:text-left">
        <h4 className="text-lg xl:text-xl font-black tracking-tight mb-1">Impacto Financiero Proyectado</h4>
        <p className="text-slate-400 text-[10px] xl:text-xs font-medium">Estimación de ingresos basada en membresías activas este mes.</p>
      </div>
      <div className="bg-white/10 px-6 xl:px-8 py-3 xl:py-4 rounded-2xl backdrop-blur-md border border-white/5 text-center shrink-0 w-full md:w-auto">
        <p className="text-[9px] xl:text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Neto (Bruto)</p>
        {/* Aquí está el toFixed(2) salvador */}
        <p className="text-2xl xl:text-3xl font-black text-white truncate">{Number(total || 0).toFixed(2)}€</p>
      </div>
    </div>
  );
}