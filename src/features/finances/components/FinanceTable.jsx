import React from 'react';

export default function FinanceTable({ subscriptions, onRefresh }) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl flex flex-col h-[45vh] min-h-[300px] max-h-[500px]">
      
      <div className="p-4 xl:p-6 border-b border-slate-50 flex justify-between items-center shrink-0">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Historial de Cobros</h3>
        <button onClick={onRefresh} className="text-[10px] xl:text-xs font-black text-blue-600 uppercase hover:underline">Actualizar</button>
      </div>
      
      <div className="overflow-auto flex-1 custom-scrollbar relative">
        <table className="w-full text-left">
          <thead className="bg-slate-50/95 backdrop-blur-sm text-[10px] xl:text-xs font-black text-slate-400 uppercase tracking-widest sticky top-0 z-10">
            <tr>
              <th className="px-8 py-3">ID</th>
              <th className="px-8 py-3">Plan</th>
              <th className="px-8 py-3">Precio</th>
              <th className="px-8 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-3 text-xs font-bold text-slate-400">#SUB-{sub.id}</td>
                <td className="px-8 py-3 text-sm font-black text-slate-800 uppercase">
                  {sub.tipo_plan || 'Plan Básico'}
                </td>
                <td className="px-8 py-3 text-sm font-black text-slate-600">
                  {Number(sub.precio || 0).toFixed(2)}€
                </td>
                <td className="px-8 py-3">
                  <span className={`px-3 py-1 rounded-full text-[9px] xl:text-[10px] font-black uppercase tracking-widest ${
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