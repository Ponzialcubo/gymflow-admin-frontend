import React from 'react';
import ExerciseCard from './ExerciseCard';

export default function ClientWorkoutPlan({ rutinas, onOpenRutinaModal }) {
  const ordenDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const rutinasAgrupadas = rutinas.reduce((acc, r) => {
    const dia = r.dia_semana || 'Lunes';
    if (!acc[dia]) acc[dia] = [];
    acc[dia].push(r);
    return acc;
  }, {});
  const diasConRutinas = ordenDias.filter(dia => rutinasAgrupadas[dia]);

  return (
    <div className="lg:col-span-2 bg-white p-10 md:p-12 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Planificación Técnica</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Rutinas personalizadas por día</p>
        </div>
        <button onClick={onOpenRutinaModal} className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">+ Añadir Ejercicio</button>
      </div>

      <div className="space-y-12">
        {diasConRutinas.length > 0 ? diasConRutinas.map(dia => (
          <div key={dia} className="animate-in slide-in-from-left duration-500">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xs uppercase shadow-lg italic">{dia.substring(0, 2)}</span>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{dia}</h3>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rutinasAgrupadas[dia].map(r => <ExerciseCard key={r.id} rutina={r} />)}
            </div>
          </div>
        )) : (
          <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200"><span className="text-4xl mb-4 block opacity-20">🏋️‍♂️</span><p className="text-slate-400 font-black uppercase tracking-widest text-[10px] italic">No hay rutinas asignadas para esta semana</p></div>
        )}
      </div>
    </div>
  );
}