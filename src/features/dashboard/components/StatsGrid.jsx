import React from 'react';

export default function StatsGrid({ stats }) {
  // Extraemos el desglose de forma segura (por si la BD está vacía al principio)
  const desglose = stats?.desglosePlanes || {};
  const planes = Object.entries(desglose); // Convierte el objeto en un array para poder mapearlo

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 1. Socios */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Comunidad Activa</p>
            <h3 className="text-5xl font-black text-slate-900 mt-3 tracking-tighter">{stats?.sociosActivos || 0}</h3>
          </div>
          <span className="text-5xl opacity-80 text-blue-600">👥</span>
        </div>
        
        {/* DESGLOSE DINÁMICO DE PLANES */}
        <div className="flex flex-wrap gap-3 text-sm font-bold uppercase tracking-wide mt-4">
          {planes.length > 0 ? (
            planes.map(([nombrePlan, cantidad], idx) => (
              <span key={idx} className="bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
                {cantidad} {nombrePlan}
              </span>
            ))
          ) : (
            <span className="text-slate-400">Sin suscripciones</span>
          )}
        </div>
      </div>

      {/* 2. Ingresos */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Facturación Mensual</p>
            <h3 className="text-5xl font-black text-slate-900 mt-3 tracking-tighter">{stats?.ingresosMensuales || "0.00"}€</h3>
          </div>
          <span className="text-5xl opacity-80 text-emerald-500">💰</span>
        </div>
        <div className="w-full mt-4">
          <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">
            <span className="text-emerald-600">Mes en curso</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="h-full bg-emerald-500 w-[100%]"></div>
          </div>
        </div>
      </div>

      {/* 3. Termómetro de Aforo (Lo mantenemos simulado hasta que hagamos la tabla de asistencias) */}
      <div className="bg-slate-900 p-8 rounded-[2rem] shadow-lg flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-sm font-bold text-blue-400 uppercase tracking-wide">Aforo en Tiempo Real</p>
            <h3 className="text-5xl font-black text-white mt-3 tracking-tighter">12<span className="text-2xl text-slate-400 font-bold">/100</span></h3>
          </div>
          <span className="text-5xl opacity-90">🔥</span>
        </div>
        <div className="w-full mt-4 relative z-10">
          <p className="text-sm font-bold text-slate-300 uppercase tracking-wide mb-2">Capacidad al 12%</p>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[12%] rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}