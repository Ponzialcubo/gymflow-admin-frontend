import React from 'react';

export default function ExerciseCard({ exercise, onDelete, onView, deleteConfirmId, onCancelDelete }) {
  const getIcon = (grupo) => {
    const icons = { pecho: '💪', espalda: '🪵', pierna: '🦵', hombro: '🛡️', brazos: '🦾', core: '🧘' };
    return icons[grupo?.toLowerCase()] || '🏋️‍♂️';
  };

  const isVideo = exercise.imagen_url?.match(/\.(mp4|webm)$/i);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden flex flex-col">
      
      {/* CAMBIO AQUÍ: bg-white en vez de gris, cursor-pointer para indicar que se puede hacer clic */}
      <div className="h-56 bg-white relative overflow-hidden cursor-pointer" onClick={() => onView(exercise)}>
        
        {exercise.imagen_url ? (
          isVideo ? (
            <video src={exercise.imagen_url} autoPlay loop muted playsInline className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          ) : (
            // CAMBIO AQUÍ: object-contain y p-6 para que la imagen no se recorte
            <img src={exercise.imagen_url} alt={exercise.nombre} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700" />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-20 group-hover:opacity-60 transition-all">
            {getIcon(exercise.grupo_muscular)}
          </div>
        )}
        
        {/* Sombra sutil y botón de PLAY si es animado */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 pointer-events-none">
          <span className="text-[10px] font-black text-blue-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full uppercase border border-blue-100 tracking-widest shadow-sm">
            {exercise.grupo_muscular}
          </span>
          {exercise.imagen_url && (
            <span className="text-[9px] font-black text-slate-800 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span> 
              VER
            </span>
          )}
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        {/* Título clickeable para abrir el modal también */}
        <h3 onClick={() => onView(exercise)} className="text-2xl font-black text-slate-800 uppercase mb-3 hover:text-blue-600 cursor-pointer transition-colors tracking-tight leading-tight">
          {exercise.nombre}
        </h3>
        <p className="text-xs text-slate-400 font-bold leading-relaxed mb-8 flex-1 uppercase line-clamp-2">
          {exercise.descripcion || 'Sin descripción técnica asignada.'}
        </p>
        <div className="flex justify-between items-center pt-6 border-t border-slate-50">
          <span className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest">ID #{exercise.id}</span>
          {deleteConfirmId === exercise.id ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">¿Eliminar?</span>
              <button
                onClick={() => onDelete(exercise.id)}
                className="px-3 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all"
              >
                Sí
              </button>
              <button
                onClick={onCancelDelete}
                className="px-3 py-2 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                No
              </button>
            </div>
          ) : (
            <button onClick={() => onDelete(exercise.id)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xl">
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}