import React from 'react';

export default function PaymentsHeader({ onOpenModal, onExportPDF }) {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 mb-10 bg-white p-4 pr-6 rounded-[2.5rem] shadow-xl shadow-slate-200/20 border border-slate-100">
      
      {/* Información de Estado (Sutil y elegante) */}
      <div className="flex items-center gap-5 pl-4">
        <div className="w-14 h-14 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center text-emerald-500 text-2xl shadow-sm border border-emerald-100/50">
          💳
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm font-black text-slate-800 tracking-tight">Estado del Sistema</span>
            <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm">
              Pasarela Activa
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Control de ingresos recurrentes
          </p>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="flex items-center gap-4 w-full xl:w-auto">
        <button 
          className="flex-1 xl:flex-none px-6 py-4 bg-slate-50 border border-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
          onClick={onExportPDF}
        >
          <span className="text-base">📄</span> Exportar PDF
        </button>

        <button 
          onClick={onOpenModal}
          className="flex-1 xl:flex-none px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-slate-900 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Nueva Suscripción
        </button>
      </div>
    </div>
  );
}