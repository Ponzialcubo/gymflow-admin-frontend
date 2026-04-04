import React from 'react';

export default function DashboardSidebar({ stats, onOpenSupport, onOpenDoc }) {
  // Extraemos las alertas del backend
  const alertas = stats?.alertasCaducidad || [];
  const numAlertas = alertas.length;

  return (
    <div className="space-y-6">
      
      {/* TARJETA DE SUGERENCIA DINÁMICA */}
      {/* Reducimos el padding en 'lg' (p-6) y lo restauramos en 'xl' (xl:p-8) */}
      <div className={`bg-white p-6 xl:p-8 rounded-[2.5rem] border-2 shadow-sm relative overflow-hidden group transition-all ${numAlertas > 0 ? 'border-red-100' : 'border-emerald-100'}`}>
         <div className={`absolute top-0 left-0 w-2 h-full ${numAlertas > 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
         
         <div className="flex items-center gap-2 xl:gap-3 mb-4 pl-2">
           <span className={`text-2xl xl:text-3xl ${numAlertas > 0 ? 'animate-pulse' : ''}`}>{numAlertas > 0 ? '⚠️' : '✅'}</span>
           <h3 className={`text-xs xl:text-sm font-black uppercase tracking-wide ${numAlertas > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
             {numAlertas > 0 ? 'Atención Requerida' : 'Todo al día'}
           </h3>
         </div>
         
         <p className="text-sm xl:text-base font-semibold text-slate-700 leading-relaxed pl-2 mt-2">
           {numAlertas > 0 ? (
             <>Tienes <span className="text-red-600 font-black text-base xl:text-lg">{numAlertas} socios</span> cuya suscripción expira en los próximos 7 días.</>
           ) : (
             'No hay suscripciones a punto de caducar. ¡Gran trabajo de retención!'
           )}
         </p>
         
         {numAlertas > 0 && (
           <button className="mt-6 ml-2 text-xs xl:text-sm font-black text-red-600 uppercase tracking-wide hover:text-red-700 transition-colors flex items-center gap-2 group-hover:underline decoration-2 underline-offset-4">
             Revisar listado <span>→</span>
           </button>
         )}
      </div>

      {/* Tarjeta de Soporte Pro */}
      <div className="bg-slate-900 p-6 xl:p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden flex flex-col justify-center">
        {/* Ajustamos los textos para que no rompan en pantallas medias */}
        <h3 className="text-2xl xl:text-3xl font-black tracking-tight mb-2">Central de Soporte</h3>
        <p className="text-xs xl:text-sm font-bold uppercase tracking-wide text-slate-400 mb-6 xl:mb-8">Núcleo GymFlow</p>
        
        <div className="space-y-3 xl:space-y-4">
          <button 
            onClick={onOpenDoc}
            // Clave del arreglo: gap menor, padding vertical menor, texto xs en lg y sm en xl. 
            // flex-wrap por si alguien tiene una tablet muy estrecha.
            className="flex items-center justify-center flex-wrap gap-2 xl:gap-3 w-full py-4 xl:py-5 px-2 bg-blue-600 rounded-xl text-xs xl:text-sm font-black uppercase tracking-wide hover:bg-blue-500 hover:shadow-lg transition-all text-center leading-tight">
            <span className="text-lg xl:text-xl">📖</span> Documentación
          </button>
          
          <button 
            onClick={onOpenSupport}
            className="flex items-center justify-center flex-wrap gap-2 xl:gap-3 w-full py-4 xl:py-5 px-2 bg-slate-800 border border-slate-700 rounded-xl text-xs xl:text-sm font-black uppercase tracking-wide hover:bg-slate-700 transition-all text-center leading-tight"
          >
            <span className="text-lg xl:text-xl">💬</span> Contactar
          </button>
        </div>
      </div>
    </div>
  );
}