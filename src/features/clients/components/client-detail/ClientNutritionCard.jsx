import React, { useState } from 'react';

export default function ClientNutritionCard({ dieta, onOpenDietaModal }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 group transition-all duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Nutrición</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Estrategia Activa</p>
        </div>
        <span className="text-3xl group-hover:rotate-12 transition-transform">🍎</span>
      </div>

      {dieta ? (
        <div className="space-y-6">
          {/* VISTA DE MACROS (Resumen) */}
          <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Plan Objetivo</p>
            <p className="text-xl font-black mt-1 uppercase leading-tight truncate">{dieta.nombre_dieta}</p>
            <p className="text-4xl font-black mt-2 tracking-tighter">
              {dieta.calorias_objetivo} <span className="text-sm opacity-80 tracking-widest">KCAL</span>
            </p>
          </div>

          {/* GRID DE MACROS */}
          <div className="grid grid-cols-3 gap-3">
            <MacroBox label="Prot" value={dieta.proteinas} color="blue" />
            <MacroBox label="Carbs" value={dieta.carbohidratos} color="emerald" />
            <MacroBox label="Grasa" value={dieta.grasas} color="orange" />
          </div>

          {/* DESPLEGABLE DE MENÚ DETALLADO */}
          <div className={`overflow-hidden transition-all duration-500 ${showMenu ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {dieta.comidas_dieta?.map((comida) => (
                <div key={comida.id} className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">{comida.momento_dia}</p>
                  <div className="flex flex-wrap gap-2">
                    {comida.comida_alimentos?.map((item, idx) => (
                      <span key={idx} className="text-[11px] font-bold text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-100">
                        {item.alimentos_catalogo?.nombre} <span className="text-slate-400">({item.cantidad_g}g)</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex gap-3 mt-8">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              {showMenu ? 'Ocultar Menú' : 'Ver Menú Completo'}
            </button>
            <button 
              onClick={onOpenDietaModal} 
              className="flex-[1.5] py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
            >
              Actualizar Plan
            </button>
          </div>
        </div>
      ) : (
        <div className="py-12 px-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-center">
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest">Sin asignación activa</p>
          <button onClick={onOpenDietaModal} className="mt-4 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline">Asignar ahora</button>
        </div>
      )}
    </div>
  );
}

// Subcomponente interno para los macros
function MacroBox({ label, value, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50/50",
    emerald: "text-emerald-600 bg-emerald-50/50",
    orange: "text-orange-600 bg-orange-50/50"
  };
  return (
    <div className={`p-4 rounded-2xl text-center border border-slate-50 ${colors[color]}`}>
      <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-70">{label}</p>
      <p className="text-lg font-black">{value}g</p>
    </div>
  );
}