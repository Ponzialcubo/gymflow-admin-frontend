import React from 'react';

export default function FinanceHeader({ stats }) {
  // Función mágica para matar al poltergeist de los decimales infinitos
  const formatMoney = (val) => Number(val || 0).toFixed(2);

  const cards = [
    { label: 'Ingresos Mensuales', value: `${formatMoney(stats.total)}€`, color: 'text-blue-600', icon: '💰' },
    { label: 'Suscripciones Activas', value: stats.activos, color: 'text-emerald-600', icon: '📈' },
    { label: 'Ticket Promedio', value: `${formatMoney(stats.promedio)}€`, color: 'text-slate-700', icon: '💎' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-5 xl:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2 xl:mb-4">
            <span className="text-xl xl:text-2xl">{card.icon}</span>
            <p className="text-[9px] xl:text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
          </div>
          <p className={`text-3xl lg:text-2xl xl:text-4xl font-black ${card.color} tracking-tighter truncate`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}