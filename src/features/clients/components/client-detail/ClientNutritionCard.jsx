import React from 'react';

export default function ClientNutritionCard({ dieta, onOpenDietaModal }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 group">
      <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-slate-800 tracking-tighter">Nutrición</h2>
          <span className="text-2xl group-hover:rotate-12 transition-transform">🍎</span>
      </div>
      {dieta ? (
        <div className="space-y-6">
          <div className="p-5 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-100">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Plan Objetivo</p>
              <p className="text-lg font-black mt-1 uppercase leading-tight">{dieta.nombre_dieta}</p>
              <p className="text-2xl font-black mt-2">{dieta.calorias_objetivo} <span className="text-xs opacity-80">KCAL</span></p>
          </div>
          <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Prot</p>
                  <p className="text-sm font-black text-slate-800">{dieta.proteinas}g</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Carbs</p>
                  <p className="text-sm font-black text-slate-800">{dieta.carbohidratos}g</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Grasa</p>
                  <p className="text-sm font-black text-slate-800">{dieta.grasas}g</p>
              </div>
          </div>
        </div>
      ) : <p className="text-xs text-slate-400 font-bold italic text-center py-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 uppercase tracking-widest">Sin asignación nutricional</p>}
      <button onClick={onOpenDietaModal} className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl">
        Actualizar Plan
      </button>
    </div>
  );
}