import React from 'react';

export default function ClientMeasurementsHistory({ mediciones, onOpenModal }) {
  // Escudo maestro: Si mediciones no es un array, o no existe, forzamos un array vacío.
  const listaSegura = Array.isArray(mediciones) ? mediciones : [];

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
      <h2 className="text-2xl font-black text-slate-800 tracking-tighter mb-8">Evolución Física</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
        
        {listaSegura.map((m, index) => {
          // Escudo secundario: Si la fila viene corrupta, la saltamos sin romper nada
          if (!m) return null; 
          
          return (
            // Usamos un fallback seguro para el key por si el ID es nulo
            <div key={m.id || index} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-200 transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {m.fecha_medicion ? new Date(m.fecha_medicion).toLocaleDateString() : '--'}
                </span>
                <span className="text-blue-600 font-black text-lg">{m.peso_kg || '--'} KG</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Altura</p>
                  <p className="text-sm font-black text-slate-700">{m.altura_cm ? `${m.altura_cm} cm` : '--'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IMC</p>
                  <p className="text-sm font-black text-slate-700">{m.imc || '--'}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 mt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">% Grasa</span>
                <span className="text-sm font-black text-slate-700">{m.grasa_porcentaje || '--'}%</span>
              </div>

              {m.notas_monitor && (
                <p className="mt-4 text-xs text-slate-500 italic border-t border-slate-200 pt-3 font-medium">
                  "{m.notas_monitor}"
                </p>
              )}
            </div>
          );
        })}
        
        <button 
          onClick={onOpenModal} 
          className="w-full py-5 border-2 border-dashed border-slate-200 text-slate-400 rounded-3xl text-xs font-black uppercase tracking-widest hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          + Nueva Medición
        </button>
      </div>
    </div>
  );
}