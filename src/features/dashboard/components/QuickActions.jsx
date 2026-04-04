import React from 'react';

export default function QuickActions({ onOpenNuevoSocio, onOpenPago, onOpenAviso }) {
  const actions = [
    { 
      label: 'Nuevo Socio', 
      icon: '👤', 
      color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100',
      onClick: onOpenNuevoSocio 
    },
    { 
      label: 'Registrar Pago', 
      icon: '💳', 
      color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100',
      onClick: onOpenPago 
    },
    { 
      label: 'Crear Aviso', 
      icon: '📢', 
      color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200',
      onClick: onOpenAviso 
    }
  ];

  return (
    // En móviles (1 col), en tablets (2 cols), en monitores (3 cols)
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {actions.map((action, idx) => (
        <button 
          key={idx} 
          onClick={action.onClick} 
          // Ajustamos padding y gap para que respire en pantallas pequeñas
          className="flex items-center gap-3 xl:gap-4 bg-white p-4 xl:p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className={`${action.bg} ${action.color} ${action.border} border p-3 xl:p-4 rounded-xl transition-colors shrink-0`}>
            <span className="text-xl xl:text-2xl">{action.icon}</span>
          </div>
          <span className="text-sm xl:text-base font-black text-slate-800 uppercase tracking-tight group-hover:text-blue-600 transition-colors text-left">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}