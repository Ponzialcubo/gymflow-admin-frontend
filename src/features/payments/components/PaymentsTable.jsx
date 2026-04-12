import React from 'react';

const StatusBadge = ({ status }) => {
  const currentStatus = status || 'desconocido';
  const styles = {
    activo: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    cancelado: 'bg-red-50 text-red-600 border-red-200',
    recibo_generado: 'bg-blue-50 text-blue-600 border-blue-200',
    recibo: 'bg-purple-50 text-purple-600 border-purple-200',
    desconocido: 'bg-slate-50 text-slate-400 border-slate-200'
  };
  
  return (
    <span className={`text-[10px] xl:text-xs font-black px-3 py-1 rounded-full uppercase italic border ${styles[currentStatus] || styles.desconocido}`}>
      {currentStatus.replace('_', ' ')}
    </span>
  );
};

// RECIBIMOS activeTab como prop desde el padre
export default function PaymentsTable({ subscriptions, activeTab }) {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-6 py-4 text-[10px] xl:text-xs font-black text-slate-400 uppercase tracking-widest">Socio</th>
            <th className="px-6 py-4 text-[10px] xl:text-xs font-black text-slate-400 uppercase tracking-widest">
              {activeTab === 'membresias' ? 'Plan Contratado' : 'Concepto de Pago'}
            </th>
            <th className="px-6 py-4 text-[10px] xl:text-xs font-black text-slate-400 uppercase tracking-widest">Importe</th>
            <th className="px-6 py-4 text-[10px] xl:text-xs font-black text-slate-400 uppercase tracking-widest">Estado</th>
            {activeTab === 'membresias' && (
              <th className="px-6 py-4 text-[10px] xl:text-xs font-black text-slate-400 uppercase tracking-widest text-right">Fin Contrato</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {subscriptions.length > 0 ? (
            subscriptions.map((s) => (
              <tr key={s.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5">
                  <p className="text-base xl:text-lg font-black text-slate-800 tracking-tight">{s.usuarios?.nombre}</p>
                  <p className="text-xs text-slate-400 font-medium">{s.usuarios?.email}</p>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-sm xl:text-base font-bold px-3 py-1.5 rounded-lg italic border ${
                    activeTab === 'recibos' 
                      ? 'bg-blue-50 text-blue-600 border-blue-100' 
                      : 'bg-slate-50 text-slate-600 border-slate-100'
                  }`}>
                    {s.tipo_plan}
                  </span>
                </td>
                <td className={`px-6 py-5 text-lg xl:text-xl font-black ${
                  activeTab === 'recibos' ? 'text-blue-600' : 'text-slate-700'
                }`}>
                  {Number(s.precio || 0).toFixed(2)}€
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={s.estado} />
                </td>
                {activeTab === 'membresias' && (
                  <td className="px-6 py-5 text-right font-mono text-sm xl:text-base text-slate-500 font-bold">
                    {s.fecha_fin ? new Date(s.fecha_fin).toLocaleDateString() : 'Indefinido'}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-24 text-center">
                <p className="text-slate-300 font-black uppercase italic text-sm tracking-[0.2em]">
                  No hay datos para mostrar en esta sección
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}