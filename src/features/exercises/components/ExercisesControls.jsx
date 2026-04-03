import React from 'react';

export default function ExercisesControls({ onSearchChange, selectedMuscle, onMuscleSelect, onOpenModal }) {
  const musculos = ['Todos', 'Pecho', 'Espalda', 'Pierna', 'Hombro', 'Brazos', 'Core'];

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Biblioteca Técnica</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Control de activos biomecánicos</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
            <input 
              type="text"
              placeholder="Filtrar movimientos..."
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-700"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button 
            onClick={onOpenModal}
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
          >
            + Nuevo Ejercicio
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {musculos.map(m => (
          <button
            key={m}
            onClick={() => onMuscleSelect(m)}
            className={`px-6 py-3 rounded-2xl text-[9px] font-black transition-all border-2 ${
              selectedMuscle === m 
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
              : 'bg-slate-50 border-slate-50 text-slate-400 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}