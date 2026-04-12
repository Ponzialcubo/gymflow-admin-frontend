import React, { useState, useMemo } from 'react';

export default function NutritionForm({ socios, form, setForm, totalesActuales, diferenciaKcal }) {
  // --- 🔍 LÓGICA DE BÚSQUEDA ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Aseguramos valores por defecto para evitar errores
  const current = totalesActuales || { kcal: 0, proteinas: 0, carbohidratos: 0, grasas: 0 };

  // Filtrado de socios en tiempo real (mínimo 2 letras)
  const filteredSocios = useMemo(() => {
    if (searchTerm.length < 2) return [];
    return socios.filter(s => 
      s.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [socios, searchTerm]);

  return (
    <div className="lg:col-span-3 p-8 md:p-12 space-y-8 border-r border-slate-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 🔍 BUSCADOR DE SOCIO PREDICTIVO */}
        <div className="space-y-3 relative">
          <label className="text-[10px] uppercase font-black text-emerald-600 tracking-widest ml-1">Socio / Atleta</label>
          <div className="relative">
            <input 
              type="text"
              placeholder="Buscar socio por nombre..."
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-emerald-500 transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>

          {/* Menú desplegable de resultados */}
          {isDropdownOpen && searchTerm.length >= 2 && (
            <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {filteredSocios.length > 0 ? (
                filteredSocios.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    className="w-full p-4 text-left hover:bg-emerald-50 transition-colors border-b border-slate-50 last:border-none font-bold text-slate-700 text-sm uppercase"
                    onClick={() => {
                      setForm({...form, id_usuario: s.id});
                      setSearchTerm(s.nombre.toUpperCase());
                      setIsDropdownOpen(false);
                    }}
                  >
                    {s.nombre}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400 font-bold text-xs italic">Socio no encontrado</div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase font-black text-emerald-600 tracking-widest ml-1">Nombre del Plan</label>
          <input 
            type="text"
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-emerald-500 transition-all"
            value={form.nombre_dieta}
            onChange={e => setForm({...form, nombre_dieta: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MacroInput label="KCAL" color="slate" goal={form.calorias_objetivo} current={current.kcal} onChange={v => setForm({...form, calorias_objetivo: v})} />
        <MacroInput label="Proteína" color="blue" goal={form.proteinas} current={current.proteinas} onChange={v => setForm({...form, proteinas: v})} />
        <MacroInput label="Carbs" color="emerald" goal={form.carbohidratos} current={current.carbohidratos} onChange={v => setForm({...form, carbohidratos: v})} />
        <MacroInput label="Grasa" color="orange" goal={form.grasas} current={current.grasas} onChange={v => setForm({...form, grasas: v})} />
      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex flex-col">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Balance actual:</span>
           <span className="text-lg font-black text-slate-700">{current.kcal} / {form.calorias_objetivo} kcal</span>
        </div>
        <div className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${diferenciaKcal > 100 ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
          {diferenciaKcal > 100 ? `Faltan ${diferenciaKcal} kcal ⚠️` : '¡Objetivo cumplido! ✅'}
        </div>
      </div>
    </div>
  );
}

function MacroInput({ label, color, goal, current, onChange }) {
  const colors = {
    slate: "border-slate-200 bg-slate-900 text-white",
    blue: "border-blue-100 bg-blue-50/50 text-blue-600",
    emerald: "border-emerald-100 bg-emerald-50/50 text-emerald-600",
    orange: "border-orange-100 bg-orange-50/50 text-orange-600"
  };
  const progreso = Math.min((current / (goal || 1)) * 100, 100);

  return (
    <div className={`${colors[color]} p-5 rounded-[2.5rem] border text-center relative overflow-hidden transition-all duration-500`}>
      <label className="text-[9px] font-black uppercase block mb-1 opacity-60">{label}</label>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black">{current}</span>
        <div className="h-[1px] w-8 bg-current opacity-20 my-1"></div>
        <input 
          type="number" 
          className="w-full bg-transparent text-xs font-bold outline-none text-center opacity-60" 
          value={goal} 
          onChange={e => onChange(e.target.value)} 
        />
      </div>
      <div className="absolute bottom-0 left-0 h-1.5 bg-current opacity-20 w-full"></div>
      <div className="absolute bottom-0 left-0 h-1.5 bg-current transition-all duration-700" style={{ width: `${progreso}%` }}></div>
    </div>
  );
}