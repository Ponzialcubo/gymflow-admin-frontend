import React from 'react';

export default function NutritionGuide() {
  return (
    <div className="bg-slate-50/50 p-8 flex flex-col justify-center border-t border-slate-50 lg:border-t-0 lg:border-l lg:col-span-2">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xl">📊</span>
          <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tighter">
            Guía de <br/> Composición
          </h3>
        </div>
        
        <p className="text-xs text-slate-500 font-bold leading-relaxed uppercase">
          Los requerimientos varían según el nivel de actividad y el somatotipo del socio. 
        </p>

        <div className="space-y-2">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
            <p className="text-[10px] font-black text-blue-500 uppercase mb-0.5">Proteína</p>
            <p className="text-xs text-slate-400 font-bold leading-tight">1.8g - 2.2g por kg de peso corporal para preservar masa muscular.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 transition-colors">
            <p className="text-[10px] font-black text-orange-500 uppercase mb-0.5">Grasas</p>
            <p className="text-xs text-slate-400 font-bold leading-tight">0.8g - 1g por kg de peso para asegurar salud hormonal.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
            <p className="text-[10px] font-black text-emerald-500 uppercase mb-0.5">Hidratos</p>
            <p className="text-xs text-slate-400 font-bold leading-tight">Resto de calorías según demanda energética del entrenamiento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}