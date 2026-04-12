import React, { useState, useEffect } from 'react';

export default function PaymentsHeader({ onOpenModal, onExportPDF, currentOccupancy = 27, maxCapacity = 100 }) {
  // 1. Lógica de conexión simplificada
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const percentage = (currentOccupancy / maxCapacity) * 100;

  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 mb-12 p-2">
      
      {/* --- 1. MONITOR DE OCUPACIÓN (DISEÑO DARK PRO) --- */}
      <div className="flex items-center gap-8 bg-slate-900 px-10 py-6 rounded-[2.5rem] shadow-2xl border border-slate-800 w-full xl:w-auto transition-all hover:scale-[1.02]">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">Ocupación Live</span>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-5xl font-black tracking-tighter">{currentOccupancy}</span>
            <span className="text-slate-500 text-xl font-bold">/ {maxCapacity}</span>
          </div>
        </div>

        {/* Barra técnica indicadora */}
        <div className="hidden md:block w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div 
            className="h-full bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* --- 2. ESTADO DE PASARELA (DISCRETO) --- */}
      <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex h-3 w-3">
          {isOnline && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
        </div>
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          Pasarela {isOnline ? 'Activa' : 'Offline'}
        </span>
      </div>

      {/* --- 3. ACCIONES PRINCIPALES --- */}
      <div className="flex items-center gap-4 w-full xl:w-auto">
        <button 
          onClick={onExportPDF}
          className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white border-2 border-slate-100 text-slate-500 rounded-[1.8rem] font-black text-[11px] uppercase tracking-widest hover:border-slate-300 hover:text-slate-800 transition-all active:scale-95"
        >
          <span className="text-lg">📄</span>
          Reporte
        </button>

        <button 
          onClick={onOpenModal}
          className="flex-1 xl:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.15em] shadow-2xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-2 transition-all active:scale-95"
        >
          <span className="text-2xl leading-none">+</span>
          Suscripción
        </button>
      </div>

    </div>
  );
}