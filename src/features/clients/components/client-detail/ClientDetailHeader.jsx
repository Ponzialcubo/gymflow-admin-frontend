import React from 'react';

export default function ClientDetailHeader({ onBack, onOpenEditModal, onBaja }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100">
      <button onClick={onBack} className="text-slate-400 hover:text-blue-600 transition-all flex items-center gap-3 text-xs font-black uppercase tracking-widest group">
        <span className="group-hover:-translate-x-2 transition-transform bg-slate-50 w-8 h-8 flex items-center justify-center rounded-full">←</span> Volver al Listado
      </button>
      <div className="flex gap-3 w-full md:w-auto">
          <button onClick={onOpenEditModal} className="flex-1 md:flex-none px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 border border-slate-100 transition-all">
            Editar Perfil
          </button>
          <button onClick={onBaja} className="flex-1 md:flex-none px-6 py-3 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 border border-red-100 transition-all">
            Baja de Socio
          </button>
      </div>
    </div>
  );
}