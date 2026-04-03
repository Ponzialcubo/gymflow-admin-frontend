import React from 'react';

export default function FinanceTable({ subscriptions, onRefresh }) {
  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Historial de Cobros</h3>
        <button onClick={onRefresh} className="text-[10px] font-black text-blue-600 uppercase hover:underline">Actualizar Datos</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5">ID</th>
              <th className="px-8 py-5">Plan</th>
              <th className="px-8 py-5">Precio</th>
              <th className="px-8 py-5">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5 text-xs font-bold text-slate-400">#SUB-{sub.id}</td>
                <td className="px-8 py-5 text-sm font-black text-slate-800 uppercase">{sub.tipo || 'Plan Básico'}</td>
                <td className="px-8 py-5 text-sm font-black text-slate-600">{sub.precio}€</td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                    sub.estado === 'activo' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {sub.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}