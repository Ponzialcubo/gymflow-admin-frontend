import React from 'react';

export default function FinanceFooter({ total }) {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <h4 className="text-xl font-black tracking-tight mb-1">Impacto Financiero Proyectado</h4>
        <p className="text-slate-400 text-xs font-medium">Estimación de ingresos basada en membresías activas este mes.</p>
      </div>
      <div className="bg-white/10 px-8 py-4 rounded-2xl backdrop-blur-md border border-white/5 text-center">
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Neto (Bruto)</p>
        <p className="text-3xl font-black text-white">{total}€</p>
      </div>
    </div>
  );
}