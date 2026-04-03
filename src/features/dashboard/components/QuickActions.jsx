import React from 'react';

// Ahora recibimos 3 funciones por props
export default function QuickActions({ onOpenNuevoSocio, onOpenPago, onOpenAviso }) {
  const actions = [
    { 
      label: 'Nuevo Socio', 
      icon: '👤', 
      color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100',
      onClick: onOpenNuevoSocio // Asignamos la acción
    },
    { 
      label: 'Registrar Pago', 
      icon: '💳', 
      color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100',
      onClick: onOpenPago // Asignamos la acción
    },
    { 
      label: 'Crear Aviso', 
      icon: '📢', 
      color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200',
      onClick: onOpenAviso // Asignamos la acción
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {actions.map((action, idx) => (
        <button 
          key={idx} 
          onClick={action.onClick} // El gatillo que dispara el modal
          className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className={`${action.bg} ${action.color} ${action.border} border p-4 rounded-xl transition-colors`}>
            <span className="text-2xl">{action.icon}</span>
          </div>
          <span className="text-base font-black text-slate-800 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}