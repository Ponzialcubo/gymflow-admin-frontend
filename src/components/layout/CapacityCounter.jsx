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
    <div className="bg-slate-900 p-2 px-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-3 transition-all hover:bg-slate-850 relative overflow-hidden group">
      
      {/* Sección Izquierda: Icono Minimalista */}
      <div className="relative">
        <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-sm border border-slate-700">
          👥
        </div>
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
      </div>

      {/* Sección Derecha: Datos Compactos */}
      <div className="flex flex-col min-w-[120px]">
        <div className="flex items-baseline justify-between mb-1">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-white tracking-tighter tabular-nums">
              {count}
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">/ {maxCapacity}</span>
          </div>
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest animate-pulse">Live</span>
        </div>

        {/* Barra de progreso Nano */}
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            style={{ width: `${(count / maxCapacity) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}