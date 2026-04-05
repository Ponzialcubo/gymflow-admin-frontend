import React from 'react';

export default function NutritionGuide() {
  return (
    <div className="bg-slate-50/50 p-8 flex flex-col justify-center border-l border-slate-50 lg:border-l">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xl">📊</span>
          <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tighter">
            Guía de <br/> Composición
          </h3>
        </div>
        
        <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase">
          Los requerimientos varían según el nivel de actividad y el somatotipo del socio. 
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
            <p className="text-[9px] font-black text-blue-500 uppercase mb-1">Proteína</p>
            <p className="text-[10px] text-slate-400 font-bold">1.8g - 2.2g por kg de peso corporal para preservar masa muscular.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-orange-200 transition-colors">
            <p className="text-[9px] font-black text-orange-500 uppercase mb-1">Grasas</p>
            <p className="text-[10px] text-slate-400 font-bold">0.8g - 1g por kg de peso para asegurar salud hormonal.</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-colors">
            <p className="text-[9px] font-black text-emerald-500 uppercase mb-1">Hidratos</p>
            <p className="text-[10px] text-slate-400 font-bold">Resto de calorías según demanda energética del entrenamiento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}