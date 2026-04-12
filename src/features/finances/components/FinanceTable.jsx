import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    COMPLETADO: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    PENDIENTE: 'bg-amber-50 text-amber-600 border-amber-100',
    CANCELADO: 'bg-red-50 text-red-600 border-red-100'
  };
  return (
    <span className={`px-4 py-2 border rounded-xl text-[10px] lg:text-xs font-black uppercase tracking-widest ${styles[status]}`}>
      {status}
    </span>
  );
};

// 👇 AQUÍ ESTÁ LA LÍNEA CLAVE QUE FALTABA (export default)
export default function FinanceTable({ movimientos }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">ID / Fecha</th>
            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Concepto</th>
            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Categoría</th>
            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Estado</th>
            <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Importe</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {movimientos.map((mov) => (
            <tr key={mov.id} className="hover:bg-slate-50/80 transition-colors group">
              <td className="px-8 py-7">
                <p className="text-base font-black text-slate-800">{mov.fecha}</p>
                <p className="text-[10px] lg:text-xs text-slate-400 font-bold uppercase mt-1.5 tracking-widest">{mov.id}</p>
              </td>
              <td className="px-8 py-7">
                <p className="text-sm lg:text-base font-black text-slate-700">{mov.concepto}</p>
              </td>
              <td className="px-8 py-7">
                <span className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl text-[10px] lg:text-xs font-black uppercase tracking-widest border border-slate-200">
                  {mov.categoria}
                </span>
              </td>
              <td className="px-8 py-7">
                <StatusBadge status={mov.estado} />
              </td>
              <td className="px-8 py-7 text-right">
                <p className={`text-xl lg:text-2xl font-black tracking-tight ${mov.tipo === 'ingreso' ? 'text-emerald-500' : 'text-slate-800'}`}>
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