import React from 'react';

export default function FinanceTable({ subscriptions, onRefresh }) {
  return (
    <div className="bg-white rounded-[2.5rem] xl:rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col h-[40vh] min-h-[300px] max-h-[450px]">
      
      <div className="p-6 xl:p-10 border-b border-slate-50 flex justify-between items-center shrink-0">
        {/* Texto de cabecera más grande */}
        <h3 className="text-sm xl:text-base font-black text-slate-800 uppercase tracking-wider">Historial de Cobros</h3>
        <button onClick={onRefresh} className="text-xs font-black text-blue-600 uppercase hover:underline tracking-widest">Actualizar Datos</button>
      </div>
      
      <div className="overflow-auto flex-1 custom-scrollbar relative">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="bg-slate-50/95 backdrop-blur-sm text-xs font-black text-slate-400 uppercase tracking-widest sticky top-0 z-10">
            <tr>
              <th className="px-8 py-5 xl:py-6">ID</th>
              <th className="px-8 py-5 xl:py-6">Plan</th>
              <th className="px-8 py-5 xl:py-6">Precio</th>
              <th className="px-8 py-5 xl:py-6">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5 xl:py-6 text-xs xl:text-sm font-bold text-slate-400">#SUB-{sub.id}</td>
                <td className="px-8 py-5 xl:py-6 text-sm xl:text-base font-black text-slate-800 uppercase">{sub.tipo || 'Plan Básico'}</td>
                <td className="px-8 py-5 xl:py-6 text-sm xl:text-base font-black text-slate-600">{Number(sub.precio || 0).toFixed(2)}€</td>
                <td className="px-8 py-5 xl:py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] xl:text-xs font-black uppercase tracking-widest ${
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