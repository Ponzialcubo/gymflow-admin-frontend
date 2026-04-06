import React from 'react';

export default function FinanceHeader({ stats }) {
  const formatMoney = (val) => Number(val || 0).toFixed(2);

  const cards = [
    { label: 'Ingresos Mensuales', value: `${formatMoney(stats.total)}€`, color: 'text-blue-600', icon: '💰' },
    { label: 'Suscripciones Activas', value: stats.activos, color: 'text-emerald-600', icon: '📈' },
    { label: 'Valor Medio Membresía', value: `${formatMoney(stats.promedio)}€`, color: 'text-slate-700', icon: '💎' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {cards.map((card, idx) => (
        // Padding suavizado (py-6 px-6 en vez de 8) y bordes un poco menos redondos (2rem)
        <div key={idx} className="bg-white py-6 px-6 xl:py-8 xl:px-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2 xl:mb-3">
            <span className="text-3xl xl:text-4xl">{card.icon}</span>
            <p className="text-xs xl:text-sm font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
          </div>
          {/* Texto bajado a 4xl/5xl */}
          <p className={`text-4xl xl:text-5xl font-black ${card.color} tracking-tighter truncate leading-none`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}