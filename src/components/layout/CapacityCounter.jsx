import React, { useState } from 'react';

export default function CapacityCounter() {
  // Estado local para probar (luego lo vincularemos a la base de datos)
  const [count, setCount] = useState(24);
  const maxCapacity = 100;

  return (
    <div className="flex items-center gap-4 bg-white px-6 py-2 rounded-2xl border border-slate-100 shadow-sm transition-all">
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">Aforo en Vivo</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-slate-800">{count}</span>
          <span className="text-xs font-bold text-slate-300">/ {maxCapacity}</span>
        </div>
      </div>
      
      {/* Botones de ajuste rápido */}
      <div className="flex gap-1 ml-2">
        <button 
          onClick={() => setCount(Math.max(0, count - 1))}
          className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all text-slate-400 font-bold border border-slate-100 active:scale-90"
        >
          -
        </button>
        <button 
          onClick={() => setCount(Math.min(maxCapacity, count + 1))}
          className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all text-slate-400 font-bold border border-slate-100 active:scale-90"
        >
          +
        </button>
      </div>
    </div>
  );
}