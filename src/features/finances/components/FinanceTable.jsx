import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    COMPLETADO: 'bg-emerald-50 text-emerald-600',
    PENDIENTE: 'bg-amber-50 text-amber-600',
    CANCELADO: 'bg-red-50 text-red-600'
  };
  return (
    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function FinanceTable({ movimientos }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Fecha</th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Concepto</th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoría</th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Importe</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {movimientos.map((mov) => (
            <tr key={mov.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-8 py-6">
                <p className="text-sm font-black text-slate-800">{mov.fecha}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{mov.id}</p>
              </td>
              <td className="px-8 py-6">
                <p className="text-sm font-black text-slate-700">{mov.concepto}</p>
              </td>
              <td className="px-8 py-6">
                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-widest">
                  {mov.categoria}
                </span>
              </td>
              <td className="px-8 py-6">
                <StatusBadge status={mov.estado} />
              </td>
              <td className="px-8 py-6 text-right">
                <p className={`text-xl font-black ${mov.tipo === 'ingreso' ? 'text-emerald-500' : 'text-slate-800'}`}>
                  {mov.tipo === 'ingreso' ? '+' : '-'}{mov.importe.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}