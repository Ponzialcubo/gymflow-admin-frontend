import React from 'react';

export default function ExerciseCard({ rutina }) {
  return (
    <div className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 flex justify-between items-center group hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all">
      <div>
        <p className="font-black text-slate-800 uppercase text-sm group-hover:text-blue-600 transition-colors leading-tight">{rutina.ejercicios?.nombre}</p>
        <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter mt-1 italic">{rutina.ejercicios?.grupo_muscular}</p>
      </div>
      <div className="text-right">
        <span className="text-xl font-black text-slate-800 leading-none">{rutina.series}x{rutina.repeticiones}</span>
        <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Work Set</p>
      </div>
    </div>
  );
}