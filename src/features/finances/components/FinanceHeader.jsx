export default function FinanceHeader({ stats }) {
  const formatMoney = (val) => Number(val || 0).toFixed(2);

  const cards = [
    { label: 'Ingresos Mensuales', value: `${formatMoney(stats.total)}€`, color: 'text-blue-600', icon: '💰' },
    { label: 'Suscripciones Activas', value: stats.activos, color: 'text-emerald-600', icon: '📈' },
    { label: 'Valor Medio Membresía', value: `${formatMoney(stats.promedio)}€`, color: 'text-slate-700', icon: '💎' }
  ];

  return (
    // Gap reducido de 6 a 4 para ganar espacio
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        // p-4 xl:p-6 (antes p-10) para que las tarjetas sean más chatas
        <div key={idx} className="bg-white p-4 xl:p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:scale-[1.02] transition-transform flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-1 xl:mb-2">
            <span className="text-xl xl:text-2xl">{card.icon}</span>
            <p className="text-[10px] xl:text-xs font-black text-slate-400 uppercase tracking-widest">{card.label}</p>
          </div>
          {/* Bajamos un pelín el texto de 5xl a 4xl para no saturar */}
          <p className={`text-3xl xl:text-4xl font-black ${card.color} tracking-tighter truncate`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}