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
    <span className={`text-[10px] xl:text-xs font-black px-4 py-1.5 rounded-full uppercase italic border ${styles[currentStatus] || styles.desconocido}`}>
      {currentStatus.replace('_', ' ')}
    </span>
  );
};

export default function PaymentsTable({ subscriptions, activeTab }) {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="border-b border-slate-100">
            {/* Aumento de padding en th para mayor visibilidad */}
            <th className="px-10 py-6 text-[11px] xl:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Socio</th>
            <th className="px-8 py-6 text-[11px] xl:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              {activeTab === 'membresias' ? 'Plan Contratado' : 'Concepto de Pago'}
            </th>
            <th className="px-8 py-6 text-[11px] xl:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Importe</th>
            <th className="px-8 py-6 text-[11px] xl:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Estado</th>
            {activeTab === 'membresias' && (
              <th className="px-8 py-6 text-[11px] xl:text-xs font-black text-slate-400 uppercase tracking-[0.2em] text-right">Fin Contrato</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {subscriptions.length > 0 ? (
            subscriptions.map((s) => (
              <tr key={s.id} className="group hover:bg-slate-50/80 transition-all duration-300 cursor-default">
                <td className="px-10 py-7">
                  <p className="text-lg xl:text-xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                    {s.usuarios?.nombre}
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    {s.usuarios?.email}
                  </p>
                </td>
                <td className="px-8 py-7">
                  <span className={`text-sm xl:text-base font-black px-4 py-2 rounded-xl italic border ${
                    activeTab === 'recibos' 
                      ? 'bg-blue-50 text-blue-600 border-blue-100' 
                      : 'bg-slate-50 text-slate-600 border-slate-100'
                  }`}>
                    {s.tipo_plan}
                  </span>
                </td>
                <td className={`px-8 py-7 text-xl xl:text-2xl font-black ${
                  activeTab === 'recibos' ? 'text-blue-600' : 'text-slate-800'
                }`}>
                  {Number(s.precio || 0).toFixed(2)}€
                </td>
                <td className="px-8 py-7">
                  <StatusBadge status={s.estado} />
                </td>
                {activeTab === 'membresias' && (
                  <td className="px-8 py-7 text-right font-mono text-sm xl:text-base text-slate-500 font-black">
                    {s.fecha_fin ? new Date(s.fecha_fin).toLocaleDateString() : 'Indefinido'}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-32 text-center">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-6xl grayscale opacity-20">📂</span>
                  <p className="text-slate-300 font-black uppercase italic text-sm tracking-[0.3em]">
                    No hay registros en esta sección
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}