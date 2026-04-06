import React from 'react';

export default function ExerciseCard({ exercise, onDelete }) {
  const getIcon = (grupo) => {
    const icons = { pecho: '💪', espalda: '🪵', pierna: '🦵', hombro: '🛡️', brazos: '🦾', core: '🧘' };
    return icons[grupo?.toLowerCase()] || '🏋️‍♂️';
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden flex flex-col">
      <div className="h-48 bg-slate-100 relative overflow-hidden">
        {exercise.imagen_url ? (
          <img src={exercise.imagen_url} alt={exercise.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-20 group-hover:opacity-60 transition-all">
            {getIcon(exercise.grupo_muscular)}
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="text-xs font-black text-blue-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full uppercase border border-blue-100 tracking-widest">
            {exercise.grupo_muscular}
          </span>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        {/* Título subido a text-2xl */}
        <h3 className="text-2xl font-black text-slate-800 uppercase mb-3 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">
          {exercise.nombre}
        </h3>
        {/* Descripción subida a text-xs */}
        <p className="text-xs text-slate-400 font-bold leading-relaxed mb-8 flex-1 uppercase">
          {exercise.descripcion || 'Sin descripción técnica asignada.'}
        </p>
        <div className="flex justify-between items-center pt-6 border-t border-slate-50">
          <span className="text-xs font-black text-slate-300 uppercase italic tracking-widest">ID #{exercise.id}</span>
          <button onClick={() => onDelete(exercise.id)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xl">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}