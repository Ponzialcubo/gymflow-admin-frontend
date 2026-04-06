import React from 'react';

export default function ExerciseCard({ exercise, onDelete }) {
  const getIcon = (grupo) => {
    const icons = { pecho: '💪', espalda: '🪵', pierna: '🦵', hombro: '🛡️', brazos: '🦾', core: '🧘' };
    return icons[grupo?.toLowerCase()] || '🏋️‍♂️';
  };

  // Detectamos si la URL termina en .mp4 o .webm para usar el reproductor de vídeo nativo
  const isVideo = exercise.imagen_url?.match(/\.(mp4|webm)$/i);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden flex flex-col">
      <div className="h-48 bg-slate-100 relative overflow-hidden">
        
        {exercise.imagen_url ? (
          isVideo ? (
            /* Reproductor de vídeo silencioso en bucle */
            <video 
              src={exercise.imagen_url} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none" 
            />
          ) : (
            /* Imagen normal o GIF animado */
            <img 
              src={exercise.imagen_url} 
              alt={exercise.nombre} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
          )
        ) : (
          /* Placeholder si no hay imagen */
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-20 group-hover:opacity-60 transition-all">
            {getIcon(exercise.grupo_muscular)}
          </div>
        )}
        
        {/* Sombra inferior que aparece al hacer hover para darle toque de cine */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Badges superiores (Grupo Muscular y Piloto de Animación) */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          <span className="text-xs font-black text-blue-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full uppercase border border-blue-100 tracking-widest shadow-sm">
            {exercise.grupo_muscular}
          </span>
          {exercise.imagen_url && (
            <span className="text-[9px] font-black text-white bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> 
              PLAY
            </span>
          )}
        </div>

      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-black text-slate-800 uppercase mb-3 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">
          {exercise.nombre}
        </h3>
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