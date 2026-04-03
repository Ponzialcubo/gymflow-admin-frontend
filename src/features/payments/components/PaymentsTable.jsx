const StatusBadge = ({ status }) => {
  const styles = status === 'activo' 
    ? 'bg-green-50 text-green-600 border-green-100' 
    : 'bg-red-50 text-red-600 border-red-100';
  
  return (
    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase italic border ${styles}`}>
      {status}
    </span>
  );
};

export default function PaymentsTable({ subscriptions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Socio</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Precio</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Fin Contrato</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {subscriptions.length > 0 ? subscriptions.map((s) => (
            <tr key={s.id} className="group hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-5">
                <p className="text-sm font-black text-slate-800">{s.usuarios?.nombre}</p>
                <p className="text-[10px] text-slate-400 font-medium">{s.usuarios?.email}</p>
              </td>
              <td className="px-6 py-5">
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg italic">
                  {s.tipo_plan}
                </span>
              </td>
              <td className="px-6 py-5 font-black text-slate-700">{s.precio}€</td>
              <td className="px-6 py-5">
                <StatusBadge status={s.estado} />
              </td>
              <td className="px-6 py-5 text-right font-mono text-xs text-slate-500 font-bold">
                {s.fecha_fin ? new Date(s.fecha_fin).toLocaleDateString() : 'Indefinido'}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="px-6 py-20 text-center text-slate-300 font-black uppercase italic text-xs tracking-widest">
                Sin registros en la base de datos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}