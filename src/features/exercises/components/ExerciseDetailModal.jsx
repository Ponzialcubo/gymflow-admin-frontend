import React from 'react';

export default function ExerciseDetailModal({ exercise, isOpen, onClose }) {
  if (!isOpen || !exercise) return null;
  
  const isVideo = exercise.imagen_url?.match(/\.(mp4|webm)$/i);

  return (
    // Fondo oscuro al hacer clic fuera se cierra
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[150] p-4" onClick={onClose}>
      {/* Contenedor del modal (evitamos que el clic dentro lo cierre con stopPropagation) */}
      <div className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
        
        {/* Lado Izquierdo: Multimedia (Blanco puro para camuflar las imágenes) */}
        <div className="md:w-1/2 bg-white relative flex items-center justify-center p-10 min-h-[300px] border-b md:border-b-0 md:border-r border-slate-100">
          {exercise.imagen_url ? (
            isVideo ? (
               <video src={exercise.imagen_url} autoPlay loop muted playsInline className="w-full h-full object-contain" />
            ) : (
               <img src={exercise.imagen_url} alt={exercise.nombre} className="w-full h-full object-contain" />
            )
          ) : (
            <span className="text-8xl">🏋️‍♂️</span>
          )}
        </div>

        {/* Lado Derecho: Info Técnica */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center bg-slate-50/50">
          <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-5 py-2 rounded-full uppercase tracking-widest w-max mb-6">
            {exercise.grupo_muscular}
          </span>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter leading-tight mb-6">
            {exercise.nombre}
          </h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wide leading-relaxed">
            {exercise.descripcion || 'Sin descripción técnica asignada.'}
          </p>
          
          <div className="mt-10 pt-6 border-t border-slate-200/60">
            <button onClick={onClose} className="w-full py-5 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl">
              Cerrar Detalle
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}