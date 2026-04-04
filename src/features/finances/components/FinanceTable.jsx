import React from 'react';

export default function FinanceTable({ subscriptions, onRefresh }) {
  return (
    // Limitamos la altura de la caja entera y la convertimos en flex column
    <div className="bg-white rounded-[2rem] xl:rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col h-[45vh] min-h-[250px] max-h-[400px]">
      
      {/* Cabecera fija de la tarjeta */}
      <div className="p-5 xl:p-8 border-b border-slate-50 flex justify-between items-center shrink-0">
        <h3 className="text-xs xl:text-sm font-black text-slate-800 uppercase tracking-wider">Historial de Cobros</h3>
        <button onClick={onRefresh} className="text-[9px] xl:text-[10px] font-black text-blue-600 uppercase hover:underline">Actualizar Datos</button>
      </div>
      
      {/* Contenedor escrolleable interno */}
      <div className="overflow-auto flex-1 custom-scrollbar relative">
        <table className="w-full text-left">
          {/* Hacemos la cabecera 'sticky' para que no desaparezca al hacer scroll */}
          <thead className="bg-slate-50/95 backdrop-blur-sm text-[9px] xl:text-[10px] font-black text-slate-400 uppercase tracking-widest sticky top-0 z-10">
            <tr>
              <th className="px-5 xl:px-8 py-3 xl:py-5">ID</th>
              <th className="px-5 xl:px-8 py-3 xl:py-5">Plan</th>
              <th className="px-5 xl:px-8 py-3 xl:py-5">Precio</th>
              <th className="px-5 xl:px-8 py-3 xl:py-5">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 xl:px-8 py-3 xl:py-4 text-[10px] xl:text-xs font-bold text-slate-400">#SUB-{sub.id}</td>
                <td className="px-5 xl:px-8 py-3 xl:py-4 text-xs xl:text-sm font-black text-slate-800 uppercase">{sub.tipo || 'Plan Básico'}</td>
                {/* Forzamos el redondeo en los precios de la tabla también */}
                <td className="px-5 xl:px-8 py-3 xl:py-4 text-xs xl:text-sm font-black text-slate-600">{Number(sub.precio || 0).toFixed(2)}€</td>
                <td className="px-5 xl:px-8 py-3 xl:py-4">
                  <span className={`px-2 xl:px-3 py-1 rounded-full text-[8px] xl:text-[9px] font-black uppercase tracking-tighter ${
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