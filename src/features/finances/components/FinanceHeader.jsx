import React from 'react';

export default function FinanceHeader({ stats }) {
  const cards = [
    { label: 'Ingresos Mensuales', value: `${stats.total}€`, color: 'text-blue-600', icon: '💰' },
    { label: 'Suscripciones Activas', value: stats.activos, color: 'text-emerald-600', icon: '📈' },
    { label: 'Ticket Promedio', value: `${stats.promedio}€`, color: 'text-slate-700', icon: '💎' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl">{card.icon}</span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
          </div>
          <p className={`text-4xl font-black ${card.color} tracking-tighter`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}