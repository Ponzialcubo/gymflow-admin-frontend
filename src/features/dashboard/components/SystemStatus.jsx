import React, { useState, useEffect } from 'react';

export default function SystemStatus() {
  // 1. Estado reactivo basado en la API real del navegador
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // 2. Efecto para escuchar cambios en la red en tiempo real
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Limpieza de eventos (Buenas prácticas de React)
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div 
      className={`flex items-center gap-5 p-4 px-8 rounded-[2rem] shadow-sm border-2 transition-all duration-500 ${
        isOnline 
          ? 'bg-emerald-50/50 border-emerald-100' 
          : 'bg-red-50/50 border-red-100'
      }`}
      role="status"
      aria-live="polite"
    >
       <div className="flex flex-col items-end justify-center">
         <span className={`text-[10px] font-black uppercase tracking-[0.2em] leading-tight transition-colors ${
           isOnline ? 'text-emerald-600' : 'text-red-600'
         }`}>
           Estado del Núcleo
         </span>
         <span className={`text-sm font-bold transition-colors ${
           isOnline ? 'text-emerald-900' : 'text-red-900'
         }`}>
           {isOnline ? 'Conexión Estable' : 'Sistema Offline'}
         </span>
       </div>
       
       {/* Indicador LED Mejorado */}
       <div className="relative flex items-center justify-center">
         {/* Anillo de pulso dinámico (solo cuando hay conexión) */}
         {isOnline && (
           <span className="absolute w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-75"></span>
         )}
         {/* Punto central */}
         <span className={`relative w-3 h-3 rounded-full shadow-lg transition-colors duration-500 ${
           isOnline 
             ? 'bg-emerald-500 shadow-emerald-500/50' 
             : 'bg-red-500 shadow-red-500/50'
         }`}></span>
       </div>
    </div>
  );
}