import React, { useState, useEffect } from 'react';

export default function CapacityCounter() {
  const [count, setCount] = useState(31);
  const maxCapacity = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const chance = Math.floor(Math.random() * 3);
        let newCount = prevCount;

        if (chance === 0 && prevCount > 10) {
          newCount = prevCount - 1; 
        } else if (chance === 2 && prevCount < maxCapacity) {
          newCount = prevCount + 1;
        }
        return newCount;
      });
    }, 10000); // Actualización cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const percentage = (count / maxCapacity) * 100;

  return (
    <div className="flex flex-col gap-1 items-start">
      {/* Etiqueta LIVE profesional */}
      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 mb-1">
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
        <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
      </div>

      <div className="flex items-baseline gap-2">
        {/* Número principal refinado */}
        <span className="text-5xl font-extrabold text-blue-600 tracking-tighter tabular-nums">
          {count}
        </span>
        
        {/* Detalles de aforo alineados con el número */}
        <div className="flex flex-col text-slate-500 text-sm font-medium">
          <span className="tracking-tight">/ {maxCapacity} Máx.</span>
          <span className="text-xs text-slate-400">{Math.round(percentage)}% Ocupado</span>
        </div>
      </div>
      
      {/* Subtexto descriptivo */}
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mt-1">
        Ocupación en tiempo real
      </p>
    </div>
  );
}