import React from 'react';

export default function NutritionForm({ socios, form, setForm, kcalCalculadas, totalesActuales, diferenciaKcal }) {
  return (
    <div className="lg:col-span-3 p-8 md:p-12 space-y-8 border-r border-slate-50">
      {/* ... (Selectores de Socio y Nombre de Plan iguales) ... */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Pasamos tanto el valor del objetivo (form) como el valor actual (totalesActuales) */}
        <MacroInput 
            label="Objetivo KCAL" 
            color="slate" 
            goal={form.calorias_objetivo} 
            current={totalesActuales.kcal} 
            onChange={v => setForm({...form, calorias_objetivo: v})} 
        />
        <MacroInput 
            label="Proteína" 
            color="blue" 
            goal={form.proteinas} 
            current={totalesActuales.proteinas} 
            onChange={v => setForm({...form, proteinas: v})} 
        />
        <MacroInput 
            label="Carbs" 
            color="emerald" 
            goal={form.carbohidratos} 
            current={totalesActuales.carbohidratos} 
            onChange={v => setForm({...form, carbohidratos: v})} 
        />
        <MacroInput 
            label="Grasa" 
            color="orange" 
            goal={form.grasas} 
            current={totalesActuales.grasas} 
            onChange={v => setForm({...form, grasas: v})} 
        />
      </div>

      {/* Barra de balance de macros */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex flex-col">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Balance actual:</span>
           <span className="text-lg font-black text-slate-700">{totalesActuales.kcal} / {form.calorias_objetivo} kcal</span>
        </div>
        <div className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest ${diferenciaKcal > 100 ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {diferenciaKcal > 100 ? `Faltan ${diferenciaKcal} kcal ⚠️` : '¡Objetivo cumplido! ✅'}
        </div>
      </div>
    </div>
  );
}

// Subcomponente MacroInput mejorado
function MacroInput({ label, color, goal, current, onChange }) {
  const colors = {
    slate: "border-slate-200 bg-slate-900 text-white",
    blue: "border-blue-100 bg-blue-50/50 text-blue-600",
    emerald: "border-emerald-100 bg-emerald-50/50 text-emerald-600",
    orange: "border-orange-100 bg-orange-50/50 text-orange-600"
  };

  // Calculamos el porcentaje de progreso para una mini-barra
  const progreso = Math.min((current / goal) * 100, 100);

  return (
    <div className={`${colors[color]} p-5 rounded-[2.5rem] border text-center relative overflow-hidden transition-all duration-500`}>
      <label className="text-[9px] font-black uppercase block mb-1 opacity-60">{label}</label>
      
      {/* Valor actual vs Objetivo */}
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black leading-none">{Math.round(current)}</span>
        <div className="h-[1px] w-8 bg-current opacity-20 my-1"></div>
        <input 
          type="number" 
          className="w-full bg-transparent text-xs font-bold outline-none text-center opacity-60" 
          value={goal} 
          onChange={e => onChange(e.target.value)} 
        />
      </div>

      {/* Mini barra de progreso en el borde inferior */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-current opacity-20 w-full"></div>
      <div 
        className="absolute bottom-0 left-0 h-1.5 bg-current transition-all duration-700" 
        style={{ width: `${progreso}%` }}
      ></div>
    </div>
  );
}