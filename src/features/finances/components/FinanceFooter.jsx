export default function FinanceFooter({ total }) {
  return (
    // Reducimos p-8 a p-5 para ganar casi 100px de pantalla
    <div className="bg-slate-900 rounded-[2rem] p-5 xl:p-6 text-white flex justify-between items-center gap-4 shrink-0 shadow-2xl">
      <div>
        <h4 className="text-lg xl:text-xl font-black tracking-tight mb-0.5">Impacto Proyectado</h4>
        <p className="text-slate-400 text-[10px] font-bold uppercase opacity-60">Basado en membresías activas</p>
      </div>
      <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/10 text-center shadow-inner">
        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Neto</p>
        <p className="text-3xl xl:text-4xl font-black text-white tracking-tighter">
          {Number(total || 0).toFixed(2)}€
        </p>
      </div>
    </div>
  );
}