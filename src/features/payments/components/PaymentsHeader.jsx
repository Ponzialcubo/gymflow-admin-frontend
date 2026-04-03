import React from 'react';

export default function PaymentsHeader({ onOpenModal }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
      
      {/* Título y Badge de Estado */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Membresías</h2>
          <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full uppercase border border-emerald-100 tracking-widest">
            Pasarela Activa
          </span>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
          Control de ingresos recurrentes y estados de suscripción
        </p>
      </div>

      {/* Acciones Rápidas */}
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
        <button 
          className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
          onClick={() => window.print()}
        >
          📄 Exportar PDF
        </button>

        <button 
          onClick={onOpenModal}
          className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
        >
          + Nueva Suscripción
        </button>
      </div>
    </div>
  );
}