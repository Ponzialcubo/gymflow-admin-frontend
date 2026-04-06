export default function RecentActionsFeed({ recientes }) {
  return (
    <div className="bg-slate-50/80 border-t border-slate-100 p-10 md:p-14">
      <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        Registro de Actividad Reciente
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recientes.length > 0 ? recientes.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-blue-400 flex items-center justify-center font-black text-sm">
              {r.socio?.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-base font-black text-slate-800">{r.socio}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{r.ejercicio}</p>
            </div>
            <div className="bg-blue-50 text-blue-700 text-[9px] font-black px-3 py-1.5 rounded-lg border border-blue-100">
              {r.dias}
            </div>
          </div>
        )) : (
          <div className="col-span-full py-10 text-center">
             <p className="text-sm text-slate-400 font-bold italic uppercase tracking-widest">No hay actividad registrada en la sesión actual</p>
          </div>
        )}
      </div>
    </div>
  );
}