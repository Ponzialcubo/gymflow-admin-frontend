import React from 'react';

export default function ClientNutritionCard({ dieta, onOpenDietaModal }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 group">
      <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter">Nutrición</h2>
          <span className="text-3xl group-hover:rotate-12 transition-transform">🍎</span>
      </div>
      {dieta ? (
        <div className="space-y-6">
          <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-100">
              <p className="text-xs font-black uppercase tracking-widest opacity-70">Plan Objetivo</p>
              <p className="text-xl font-black mt-1 uppercase leading-tight">{dieta.nombre_dieta}</p>
              <p className="text-4xl font-black mt-2 tracking-tighter">{dieta.calorias_objetivo} <span className="text-sm opacity-80 tracking-widest">KCAL</span></p>
          </div>
          <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Prot</p>
                  <p className="text-lg font-black text-slate-800">{dieta.proteinas}g</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Carbs</p>
                  <p className="text-lg font-black text-slate-800">{dieta.carbohidratos}g</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Grasa</p>
                  <p className="text-lg font-black text-slate-800">{dieta.grasas}g</p>
              </div>
          </div>
        </div>
      ) : <p className="text-sm text-slate-400 font-bold italic text-center py-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200 uppercase tracking-widest">Sin asignación nutricional</p>}
      <button onClick={onOpenDietaModal} className="w-full mt-8 py-5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl">
        Actualizar Plan
      </button>
    </div>
  );
}