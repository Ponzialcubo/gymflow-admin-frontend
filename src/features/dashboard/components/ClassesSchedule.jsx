export default function ClassesSchedule({ clases }) {
  return (
    <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Horario de Clases</h2>
        <span className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">Hoy</span>
      </div>

      {/* ZONA DINÁMICA DE CLASES */}
      <div className="space-y-3 flex-grow mb-6">
        {clases.length === 0 ? (
          /* EMPTY STATE: Si no hay clases hoy */
          <div className="flex flex-col items-center justify-center h-full py-10 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
            <span className="text-4xl mb-3 opacity-50">🧘‍♂️</span>
            <p className="text-sm font-bold text-slate-500">No hay sesiones programadas para hoy.</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">El club está en horario libre</p>
          </div>
        ) : (
          /* LISTA DE CLASES */
          clases.map(clase => {
            const isFull = clase.inscritos >= clase.capacidad_max;
            return (
              <div key={clase.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-5">
                  <div className="bg-slate-100 px-3 py-2 rounded-xl text-center min-w-[4rem]">
                    <p className="text-sm font-black text-slate-600">
                      {clase.horario ? new Date(clase.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{clase.nombre_clase}</h4>
                    <p className="text-xs text-slate-400">Instructor: {clase.monitor_encargado || 'Sin asignar'}</p>
                  </div>
                </div>

                <div className="mt-3 sm:mt-0 flex items-center gap-4 w-full sm:w-auto justify-between">
                  <span className="text-xs font-bold text-slate-500">Aforo {clase.inscritos || 0}/{clase.capacidad_max || 20}</span>
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isFull ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(((clase.inscritos || 0) / (clase.capacidad_max || 20)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <button className="w-full mt-auto py-4 bg-slate-900 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-slate-800 hover:shadow-lg transition-all">
        Ver Horario Completo
      </button>
    </div>
  );
}