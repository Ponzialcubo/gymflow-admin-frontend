import React from 'react';

export default function DocModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[110] p-6">
      {/* Aumentamos max-w-2xl a max-w-4xl y el padding de p-10 a p-12 */}
      <div className="bg-white rounded-[3rem] p-12 w-full max-w-4xl shadow-2xl animate-in zoom-in duration-300 relative overflow-y-auto max-h-[90vh]">
        
        {/* Botón de cerrar más visible */}
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 text-slate-400 hover:text-blue-600 transition-all font-black text-sm uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full"
        >
          Cerrar ✕
        </button>

        {/* Cabecera más grande */}
        <header className="mb-12">
          <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-3">
            Documentación <span className="text-blue-600">Pro</span>
          </h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">
            Guía maestra de administración • GymFlow Central
          </p>
        </header>
        
        {/* Grid con gap aumentado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="space-y-4 group">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              <h4 className="font-black text-slate-800 text-xl uppercase tracking-tight">Gestión de Socios</h4>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Usa el módulo de <span className="text-slate-800 font-bold">"Nuevo Socio"</span> para registros. El sistema valida automáticamente DNI, formato de email y coherencia en el teléfono antes de persistir en Supabase.
            </p>
          </div>
          
          <div className="space-y-4 group">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💳</span>
              <h4 className="font-black text-slate-800 text-xl uppercase tracking-tight">Control de Pagos</h4>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Registro centralizado de cuotas. Al procesar un pago, el sistema genera un <span className="text-slate-800 font-bold">asiento contable invisible</span> que actualiza tus métricas de facturación mensual al instante.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <h4 className="font-black text-slate-800 text-xl uppercase tracking-tight">Sistema de Avisos</h4>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Las <span className="text-red-500 font-bold">Alertas Críticas</span> bloquean la vista del socio hasta ser leídas. Ideal para cortes de suministro, mantenimientos de zona de aguas o cambios de horario festivo.
            </p>
          </div>

          <div className="space-y-4 group">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <h4 className="font-black text-slate-800 text-xl uppercase tracking-tight">Aforo en Vivo</h4>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Algoritmo basado en <span className="text-slate-800 font-bold">check-ins activos</span>. El sistema alerta visualmente cuando se alcanza el 85% de la capacidad configurada en el núcleo del sistema.
            </p>
          </div>
        </div>

        {/* Footer del modal más robusto */}
        <div className="mt-14 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center italic">
            Documentación Técnica Oficial del Proyecto de Fin de Ciclo
          </p>
          <div className="flex justify-center gap-6">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
               <span className="text-xs font-black text-slate-700 uppercase">Versión 1.0.4 Stable</span>
             </div>
             <span className="text-xs font-black text-blue-600 uppercase border-l-2 border-slate-200 pl-6">Stack: React + Tailwind + Vite</span>
          </div>
        </div>
      </div>
    </div>
  );
}