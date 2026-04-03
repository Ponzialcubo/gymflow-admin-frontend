import React from 'react';

export default function DashboardSidebar({ stats, onOpenSupport, onOpenDoc }) {
  // Extraemos las alertas del backend
  const alertas = stats?.alertasCaducidad || [];
  const numAlertas = alertas.length;

  return (
    <div className="space-y-6">
      
      {/* TARJETA DE SUGERENCIA DINÁMICA */}
      <div className={`bg-white p-8 rounded-[2.5rem] border-2 shadow-sm relative overflow-hidden group transition-all ${numAlertas > 0 ? 'border-red-100' : 'border-emerald-100'}`}>
         <div className={`absolute top-0 left-0 w-2 h-full ${numAlertas > 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
         
         <div className="flex items-center gap-3 mb-4 pl-2">
           <span className={`text-3xl ${numAlertas > 0 ? 'animate-pulse' : ''}`}>{numAlertas > 0 ? '⚠️' : '✅'}</span>
           <h3 className={`text-sm font-black uppercase tracking-wide ${numAlertas > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
             {numAlertas > 0 ? 'Atención Requerida' : 'Todo al día'}
           </h3>
         </div>
         
         <p className="text-base font-semibold text-slate-700 leading-relaxed pl-2 mt-2">
           {numAlertas > 0 ? (
             <>Tienes <span className="text-red-600 font-black text-lg">{numAlertas} socios</span> cuya suscripción expira en los próximos 7 días.</>
           ) : (
             'No hay suscripciones a punto de caducar. ¡Gran trabajo de retención!'
           )}
         </p>
         
         {numAlertas > 0 && (
           <button className="mt-6 ml-2 text-sm font-black text-red-600 uppercase tracking-wide hover:text-red-700 transition-colors flex items-center gap-2 group-hover:underline decoration-2 underline-offset-4">
             Revisar listado <span>→</span>
           </button>
         )}
      </div>

      {/* Tarjeta de Soporte Pro */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
        <h3 className="text-3xl font-black tracking-tight mb-2">Central de Soporte</h3>
        <p className="text-sm font-bold uppercase tracking-wide text-slate-400 mb-8">Núcleo de control GymFlow</p>
        
        <div className="space-y-4">
          <button 
            onClick={onOpenDoc}
            className="flex items-center justify-center gap-3 w-full py-5 bg-blue-600 rounded-xl text-sm font-black uppercase tracking-wide hover:bg-blue-500 hover:shadow-lg transition-all">
            <span className="text-xl">📖</span> Documentación Pro
          </button>
          
          <button 
            onClick={onOpenSupport}
            className="flex items-center justify-center gap-3 w-full py-5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-black uppercase tracking-wide hover:bg-slate-700 transition-all"
          >
            <span className="text-xl">💬</span> Contactar Soporte
          </button>
        </div>
      </div>
    </div>
  );
}