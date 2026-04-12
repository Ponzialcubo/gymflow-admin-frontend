export default function PaymentsTable({ subscriptions, isReciboView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Socio</th>
            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">
              {isReciboView ? 'Concepto de Pago' : 'Plan Contratado'}
            </th>
            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Importe</th>
            <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Estado</th>
            {!isReciboView && (
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Fin Contrato</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {subscriptions.map((s) => (
            <tr key={s.id} className="group hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-5">
                <p className="text-base font-black text-slate-800">{s.usuarios?.nombre}</p>
                <p className="text-xs text-slate-400">{s.usuarios?.email}</p>
              </td>
              <td className="px-6 py-5">
                <span className={`px-3 py-1.5 rounded-lg font-bold italic ${
                  isReciboView ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {s.tipo_plan}
                </span>
              </td>
              <td className="px-6 py-5 text-lg font-black text-slate-700">
                {Number(s.precio).toFixed(2)}€
              </td>
              <td className="px-6 py-5">
                <StatusBadge status={s.estado} />
              </td>
              {!isReciboView && (
                <td className="px-6 py-5 text-right font-mono text-slate-500 font-bold">
                  {s.fecha_fin ? new Date(s.fecha_fin).toLocaleDateString() : '---'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}