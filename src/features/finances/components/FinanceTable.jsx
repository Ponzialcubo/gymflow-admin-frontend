import React from 'react';

export default function FinanceTable({ subscriptions, onRefresh }) {
  return (
    // Mantenemos las dimensiones exactas del contenedor para no romper el layout general
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl flex flex-col h-[50vh] min-h-[350px] max-h-[550px]">
      
      <div className="p-4 xl:p-6 border-b border-slate-50 flex justify-between items-center shrink-0">
        {/* Cabecera subida a text-sm/base */}
        <h3 className="text-sm xl:text-base font-black text-slate-800 uppercase tracking-wider">Historial de Cobros</h3>
        <button onClick={onRefresh} className="text-[10px] xl:text-xs font-black text-blue-600 uppercase hover:underline">Actualizar</button>
      </div>
      
      <div className="overflow-auto flex-1 custom-scrollbar relative">
        <table className="w-full text-left">
          {/* Títulos de columnas subidos a text-xs */}
          <thead className="bg-slate-50/95 backdrop-blur-sm text-xs font-black text-slate-400 uppercase tracking-widest sticky top-0 z-10">
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
                {/* IDs subidos a text-sm */}
                <td className="px-8 py-3 text-sm font-bold text-slate-400">#SUB-{sub.id}</td>
                
                {/* 🐛 BUG ARREGLADO: sub.tipo_plan en lugar de sub.tipo. Texto subido a text-base */}
                <td className="px-8 py-3 text-base font-black text-slate-800 uppercase">
                  {sub.tipo_plan || 'Plan Básico'}
                </td>
                
                {/* Precio subido a text-base */}
                <td className="px-8 py-3 text-base font-black text-slate-600">
                  {Number(sub.precio || 0).toFixed(2)}€
                </td>
                
                <td className="px-8 py-3">
                  {/* Badge un poco más gordito para que acompañe al texto grande */}
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