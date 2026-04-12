import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';

export default function CapacityCounter() {
  const [maxCapacity, setMaxCapacity] = useState(250); // Valor por defecto pro
  const [count, setCount] = useState(0); 
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchMaxCapacity = async () => {
      try {
        const { data, error } = await supabase
          .from('gym_settings')
          .select('aforo_maximo')
          .eq('id', 1)
          .single();
        
        if (data && !error) {
          const max = data.aforo_maximo;
          setMaxCapacity(max);
          
          // GENERAR INICIO REALISTA: 
          // Empezamos con una ocupación de entre el 45% y el 65%
          const initialOccupancy = Math.floor(max * (0.45 + Math.random() * 0.2));
          setCount(initialOccupancy);
          setIsLoaded(true);
        }
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchMaxCapacity();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        // LÓGICA DE FLUJO REALISTA
        const occupancyRate = prev / maxCapacity;
        const rand = Math.random();

        // Si está por debajo del 40%, es muy probable que entre alguien (+1)
        if (occupancyRate < 0.4) {
          return rand > 0.3 ? prev + 1 : prev; 
        }
        
        // Si está por encima del 75%, es muy probable que alguien se vaya (-1)
        if (occupancyRate > 0.75) {
          return rand > 0.3 ? prev - 1 : prev;
        }

        // En rango normal (40-75%), fluctuación equilibrada
        if (rand > 0.6) return prev + 1;
        if (rand < 0.4) return prev - 1;
        return prev;
      });
    }, 8000); // Un poco más rápido para que se vea el cambio en la demo

    return () => clearInterval(interval);
  }, [maxCapacity, isLoaded]);

  // Si aún no carga, mostramos un estado neutro
  if (!isLoaded) return <div className="animate-pulse bg-slate-900 w-64 h-20 rounded-[2rem]"></div>;

  return (
    <div className="bg-slate-900 p-3.5 px-6 rounded-[2rem] shadow-2xl border border-slate-800 flex items-center gap-6 min-w-[240px] transition-all hover:scale-[1.02] relative overflow-hidden group">
      
      {/* Sección Izquierda: Icono con pulso dinámico según ocupación */}
      <div className="relative">
        <div className="w-11 h-11 bg-slate-800 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-slate-700">
          👥
        </div>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${count/maxCapacity > 0.8 ? 'bg-red-400' : 'bg-blue-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-slate-900 ${count/maxCapacity > 0.8 ? 'bg-red-500' : 'bg-blue-500'}`}></span>
        </span>
      </div>

      {/* Sección Derecha: Datos */}
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

        {/* Barra de progreso dinámica */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${
              count/maxCapacity > 0.8 ? 'bg-gradient-to-r from-red-600 to-orange-400' : 'bg-gradient-to-r from-blue-600 to-blue-400'
            }`}
            style={{ width: `${(count / maxCapacity) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}