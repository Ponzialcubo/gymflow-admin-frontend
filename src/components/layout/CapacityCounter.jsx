import React, { useState, useEffect } from 'react';

export default function CapacityCounter() {
  const [count, setCount] = useState(24);
  const maxCapacity = 100;

  useEffect(() => {
    // Creamos un intervalo que se ejecuta cada 8 segundos (8000ms)
    const interval = setInterval(() => {
      setCount((prevCount) => {
        // Generamos un número aleatorio para decidir qué pasa:
        // 0: Sale alguien (-1)
        // 1: No pasa nada (0)
        // 2: Entra alguien (+1)
        const chance = Math.floor(Math.random() * 3);
        
        let newCount = prevCount;

        if (chance === 0 && prevCount > 5) {
          newCount = prevCount - 1; // Sale 1 persona (mínimo 5 para que no quede vacío)
        } else if (chance === 2 && prevCount < maxCapacity) {
          newCount = prevCount + 1; // Entra 1 persona
        }

        return newCount;
      });
    }, 8000); // Actualiza cada 8 segundos para que no sea estresante

    // Limpiamos el intervalo cuando el componente se destruye
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 bg-white px-6 py-2 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">Aforo en Vivo</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-slate-800 tabular-nums">
            {count}
          </span>
          <span className="text-xs font-bold text-slate-300">/ {maxCapacity}</span>
        </div>
      </div>
      
      {/* Mantenemos los botones por si el Admin quiere corregir el número manualmente */}
      <div className="flex gap-1 ml-2">
        <button 
          onClick={() => setCount(Math.max(0, count - 1))}
          className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all text-slate-400 font-bold border border-slate-100 active:scale-90"
          title="Corregir -1"
        >
          -
        </button>
        <button 
          onClick={() => setCount(Math.min(maxCapacity, count + 1))}
          className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-900 hover:text-white rounded-xl transition-all text-slate-400 font-bold border border-slate-100 active:scale-90"
          title="Corregir +1"
        >
          +
        </button>
      </div>
    </div>
  );
}