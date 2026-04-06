import React, { useState, useEffect } from 'react';

export default function CapacityCounter() {
  // Ajusta este valor manualmente ahora, o conéctalo a tus settings luego
  const maxCapacity = 100; 
  const [count, setCount] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const chance = Math.floor(Math.random() * 3);
        if (chance === 0 && prev > 5) return prev - 1;
        if (chance === 2 && prev < maxCapacity) return prev + 1;
        return prev;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [maxCapacity]);

  const percentage = (count / maxCapacity) * 100;

  return (
    <div className="bg-white border border-slate-100 px-6 py-3 rounded-full shadow-sm flex items-center gap-4 h-[62px] min-w-[180px]">
      
      {/* Indicador LIVE sutil */}
      <div className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ocupación</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-800 tabular-nums">{count}</span>
            <span className="text-[10px] font-bold text-slate-300">/ {maxCapacity}</span>
          </div>
        </div>

        {/* Barra de progreso sutil */}
        <div className="w-full h-1 bg-slate-50 rounded-full mt-1 overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
    </div>
  );
}