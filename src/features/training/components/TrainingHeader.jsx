export default function TrainingHeader() {
  return (
    <div className="bg-slate-900 p-10 md:p-16 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
      <div className="relative z-10 flex items-center gap-8">
        <div className="bg-blue-600 w-20 h-20 rounded-[2rem] shadow-2xl shadow-blue-500/40 flex items-center justify-center text-4xl">
          🏋️‍♂️
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Planificación Técnica</h2>
          <p className="text-slate-400 text-xs font-black mt-2 uppercase tracking-[0.3em] opacity-70">Asignación masiva de microciclos de entrenamiento</p>
        </div>
      </div>
    </div>
  );
}