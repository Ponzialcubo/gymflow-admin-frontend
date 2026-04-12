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
    <div className="bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl border border-slate-800 flex items-center gap-8 min-w-[320px] transition-all hover:scale-[1.02] relative overflow-hidden group">
      
      {/* Glow decorativo de fondo */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full pointer-events-none"></div>

      {/* Sección Izquierda: Icono y Estado */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-slate-700">
            👥
          </div>
          {/* Indicador LIVE con pulso suave */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border border-slate-900"></span>
          </span>
        </div>
        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] animate-pulse">Live</span>
      </div>

      {/* Sección Derecha: Datos y Progreso */}
      <div className="flex-1 space-y-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ocupación Actual</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white tracking-tighter tabular-nums">
                {count}
              </span>
              <span className="text-sm font-bold text-slate-500">/ {maxCapacity}</span>
            </div>
          </div>
          
          {/* Porcentaje numérico */}
          <span className="text-xs font-black text-slate-400 mb-1">{Math.round(percentage)}%</span>
        </div>

        {/* Barra de progreso tecnológica */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-[1px]">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
    </div>
  );
}