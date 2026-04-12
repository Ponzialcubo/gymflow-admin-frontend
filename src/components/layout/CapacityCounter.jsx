import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';

export default function CapacityCounter() {
  const [maxCapacity, setMaxCapacity] = useState(100); 
  const [count, setCount] = useState(25);

  useEffect(() => {
    const fetchMaxCapacity = async () => {
      try {
        const { data, error } = await supabase
          .from('gym_settings')
          .select('aforo_maximo')
          .eq('id', 1)
          .single();
        if (data && !error) setMaxCapacity(data.aforo_maximo);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchMaxCapacity();
  }, []);

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

  const percentage = Math.min((count / maxCapacity) * 100, 100);

  return (
    <div className="bg-slate-900 p-4 px-5 rounded-[2rem] shadow-xl border border-slate-800 flex items-center gap-5 min-w-[280px] transition-all hover:scale-[1.01] relative overflow-hidden group">
      
      {/* Glow decorativo (más sutil) */}
      <div className="absolute -right-5 -top-5 w-24 h-24 bg-blue-600/10 blur-[40px] rounded-full pointer-events-none"></div>

      {/* Sección Izquierda: Icono y Estado (Escalado hacia abajo) */}
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-lg shadow-inner border border-slate-700">
            👥
          </div>
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border border-slate-900"></span>
          </span>
        </div>
        <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">Live</span>
      </div>

      {/* Sección Derecha: Datos y Progreso */}
      <div className="flex-1 space-y-2">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Ocupación</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white tracking-tighter tabular-nums">
                {count}
              </span>
              <span className="text-xs font-bold text-slate-500">/ {maxCapacity}</span>
            </div>
          </div>
          <span className="text-[10px] font-black text-slate-400 mb-0.5">{Math.round(percentage)}%</span>
        </div>

        {/* Barra de progreso (un poco más delgada) */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden p-[0.5px]">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.4)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}