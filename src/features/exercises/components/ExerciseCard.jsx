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
          <span className="text-[9px] font-black text-blue-600 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full uppercase border border-blue-100">
            {exercise.grupo_muscular}
          </span>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-xl font-black text-slate-800 uppercase mb-3 group-hover:text-blue-600 transition-colors">
          {exercise.nombre}
        </h3>
        <p className="text-[11px] text-slate-400 font-bold leading-relaxed mb-8 flex-1 uppercase">
          {exercise.descripcion || 'Sin descripción técnica asignada.'}
        </p>
        <div className="flex justify-between items-center pt-6 border-t border-slate-50">
          <span className="text-[10px] font-black text-slate-300 uppercase italic">ID #{exercise.id}</span>
          <button onClick={() => onDelete(exercise.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}