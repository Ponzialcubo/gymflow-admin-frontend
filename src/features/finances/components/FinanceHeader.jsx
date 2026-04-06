import React from 'react';

export default function FinanceHeader({ stats }) {
  const formatMoney = (val) => Number(val || 0).toFixed(2);

  const cards = [
    { label: 'Ingresos Mensuales', value: `${formatMoney(stats.total)}€`, color: 'text-blue-600', icon: '💰' },
    { label: 'Suscripciones Activas', value: stats.activos, color: 'text-emerald-600', icon: '📈' },
    { label: 'Valor Medio Membresía', value: `${formatMoney(stats.promedio)}€`, color: 'text-slate-700', icon: '💎' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        // Padding aumentado brutalmente (py-8 px-8 xl:py-10)
        <div key={idx} className="bg-white py-8 px-8 xl:py-10 xl:px-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-3 xl:mb-4">
            {/* Iconos gigantes */}
            <span className="text-4xl xl:text-5xl">{card.icon}</span>
            <p className="text-sm xl:text-base font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
          </div>
          {/* Valor inmenso */}
          <p className={`text-5xl xl:text-6xl font-black ${card.color} tracking-tighter truncate leading-none`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}