import React from 'react';

export default function TrainingHeader() {
  return (
    <div className="bg-slate-900 p-8 md:p-12 text-white relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="relative z-10 flex items-center gap-5">
        <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/40">
          <span className="text-2xl">🏋️‍♂️</span>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Planificación Técnica</h2>
          <p className="text-slate-400 text-[10px] font-black mt-1 uppercase tracking-[0.2em]">Asignación masiva de microciclos</p>
        </div>
      </div>
    </div>
  );
}