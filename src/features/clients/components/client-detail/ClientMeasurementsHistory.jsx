import React from 'react';

export default function ClientMeasurementsHistory({ mediciones, onOpenModal }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
      <h2 className="text-xl font-black text-slate-800 tracking-tighter mb-8">Evolución Física</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {mediciones.map(m => (
          <div key={m.id} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-200 transition-all">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {new Date(m.fecha_medicion).toLocaleDateString()}
              </span>
              <span className="text-blue-600 font-black text-sm">{m.peso_kg} KG</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400">Grasa Corporal</span>
              <span className="text-xs font-black text-slate-700">{m.grasa_porcentaje}%</span>
            </div>
            {m.notas_monitor && (
              <p className="mt-3 text-[10px] text-slate-500 italic border-t border-slate-200 pt-2 font-medium">
                "{m.notas_monitor}"
              </p>
            )}
          </div>
        ))}
        <button 
          onClick={onOpenModal} 
          className="w-full py-5 border-2 border-dashed border-slate-200 text-slate-300 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:border-blue-300 hover:text-blue-600 transition-all"
        >
          + Nueva Medición
        </button>
      </div>
    </div>
  );
}