import React from 'react';

export default function ClientsHeader({ busqueda, setBusqueda, onOpenModal }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-slate-100">
      
      {/* 1. BARRA DE BÚSQUEDA ESCALADA */}
      <div className="relative w-full md:w-[32rem]">
        {/* Icono más grande y centrado */}
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
        <input 
          type="text" 
          placeholder="Buscar socio por nombre o email..." 
          // Inputs estilo "Pro": py-5, text-lg, rounded-3xl y placeholder visible
          className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-blue-500 outline-none transition-all text-lg font-bold text-slate-700 placeholder:text-slate-400"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      
      {/* 2. BOTÓN PROFESIONALIZADO */}
      <button 
        onClick={onOpenModal}
        // Botones estilo "Pro": py-5, px-10, text-sm, tracking amplio y active:scale-95
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-3xl font-black transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.15em] active:scale-95"
      >
        <span className="text-xl leading-none mb-0.5">+</span> 
        Nuevo Registro
      </button>
    </div>
  );
}