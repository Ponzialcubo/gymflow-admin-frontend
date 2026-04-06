import React, { useState, useEffect } from 'react';

export default function CapacityCounter() {
  const [count, setCount] = useState(24);
  const maxCapacity = 100;

  useEffect(() => {
    // Intervalo de actualización (cada 6 segundos para que se note más la "vida")
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const chance = Math.floor(Math.random() * 3);
        let newCount = prevCount;

        if (chance === 0 && prevCount > 8) {
          newCount = prevCount - 1; 
        } else if (chance === 2 && prevCount < maxCapacity) {
          newCount = prevCount + 1;
        }
        return newCount;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Calculamos el color basado en la ocupación
  const percentage = (count / maxCapacity) * 100;
  const getStatusColor = () => {
    if (percentage > 80) return 'text-rose-500';
    if (percentage > 50) return 'text-amber-500';
    return 'text-blue-500';
  };

  return (
    <div className="flex items-center gap-6 bg-white px-8 py-3 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 transition-all hover:scale-105 duration-500">
      
      {/* Indicador de Punto de Pulso (Animado) */}
      <div className="relative flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${percentage > 80 ? 'bg-rose-400' : 'bg-blue-400'}`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${percentage > 80 ? 'bg-rose-500' : 'bg-blue-500'}`}></span>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1">
          Ocupación en tiempo real
        </span>
        <div className="flex items-baseline gap-2">
          {/* Número mucho más grande y con fuente monoespaciada para que no baile */}
          <span className={`text-4xl font-black tracking-tighter tabular-nums ${getStatusColor()}`}>
            {count}
          </span>
          <span className="text-lg font-bold text-slate-300 tracking-tighter">
            / {maxCapacity}
          </span>
          
          {/* Badge de porcentaje sutil */}
          <span className="ml-2 text-[10px] font-black bg-slate-50 text-slate-400 px-2 py-1 rounded-lg border border-slate-100">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
}