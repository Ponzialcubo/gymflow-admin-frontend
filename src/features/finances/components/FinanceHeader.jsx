import React from 'react';

export default function FinanceHeader({ stats }) {
  const formatMoney = (val) => Number(val || 0).toFixed(2);

  const cards = [
    { label: 'Ingresos Mensuales', value: `${formatMoney(stats.total)}€`, color: 'text-blue-600', icon: '💰' },
    { label: 'Suscripciones Activas', value: stats.activos, color: 'text-emerald-600', icon: '📈' },
    // CAMBIO: Nombre más acorde y textos más grandes
    { label: 'Valor Medio Membresía', value: `${formatMoney(stats.promedio)}€`, color: 'text-slate-700', icon: '💎' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-6 xl:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-3 xl:mb-5">
            <span className="text-2xl xl:text-3xl">{card.icon}</span>
            {/* Subido de 9px a text-xs/sm */}
            <p className="text-xs xl:text-sm font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
          </div>
          <p className={`text-4xl lg:text-3xl xl:text-5xl font-black ${card.color} tracking-tighter truncate`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}