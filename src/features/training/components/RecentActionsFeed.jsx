export default function RecentActionsFeed({ recientes }) {
  return (
    <div className="bg-slate-50/50 border-t border-slate-100 p-8">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        Últimas acciones en el servidor
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recientes.length > 0 ? recientes.map(r => (
          <div key={r.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px]">
              {r.socio?.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-xs font-black text-slate-800">{r.socio}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase">{r.ejercicio}</p>
            </div>
            <div className="bg-slate-900 text-white text-[7px] font-black px-2 py-1 rounded-md">
              {r.dias}
            </div>
          </div>
        )) : (
          <p className="text-[10px] text-slate-400 font-bold italic">No hay registros en esta sesión.</p>
        )}
      </div>
    </div>
  );
}