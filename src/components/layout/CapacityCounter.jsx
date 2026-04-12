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
    <div className="bg-slate-900 p-3.5 px-6 rounded-[2rem] shadow-2xl border border-slate-800 flex items-center gap-6 min-w-[240px] transition-all hover:scale-[1.02] relative overflow-hidden group">
      
      {/* Sección Izquierda: Icono con mejor tamaño */}
      <div className="relative">
        <div className="w-11 h-11 bg-slate-800 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-slate-700">
          👥
        </div>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-slate-900"></span>
        </span>
      </div>

      {/* Sección Derecha: Datos con jerarquía clara */}
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Ocupación</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white tracking-tighter tabular-nums">
                {count}
              </span>
              <span className="text-sm font-bold text-slate-500">/ {maxCapacity}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest animate-pulse mb-1">Live</span>
            <span className="text-xs font-black text-slate-400">{Math.round((count / maxCapacity) * 100)}%</span>
          </div>
        </div>

        {/* Barra de progreso con grosor medio */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(59,130,246,0.4)]"
            style={{ width: `${(count / maxCapacity) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}