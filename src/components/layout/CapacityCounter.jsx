import React, { useState, useEffect } from 'react';

export default function CapacityCounter() {
  const maxCapacity = 100; 
  const [count, setCount] = useState(27);

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
    <div className="bg-white border border-slate-100 px-8 py-4 rounded-[2.5rem] shadow-sm flex items-center gap-6 h-[75px] min-w-[240px] transition-all hover:shadow-md">
      
      {/* Indicador LIVE más notable */}
      <div className="flex h-3 w-3 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
      </div>

      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Ocupación</span>
          <div className="flex items-baseline gap-1">
            {/* Número principal más grande (text-2xl) */}
            <span className="text-2xl font-black text-slate-900 tracking-tighter tabular-nums">
              {count}
            </span>
            <span className="text-xs font-bold text-slate-300">/ {maxCapacity}</span>
          </div>
        </div>

        {/* Barra de progreso ligeramente más gruesa (h-1.5) */}
        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_8px_rgba(37,99,235,0.3)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
    </div>
  );
}