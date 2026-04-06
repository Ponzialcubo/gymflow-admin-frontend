export default function NutritionForm({ socios, form, setForm, loading, handleSubmit, kcalCalculadas, diferenciaKcal }) {
  return (
    <form onSubmit={handleSubmit} className="lg:col-span-2 p-8 md:p-12 space-y-8 border-r border-slate-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] uppercase font-black text-emerald-600 tracking-widest ml-1">Socio</label>
          <select 
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
            value={form.id_usuario}
            onChange={e => setForm({...form, id_usuario: e.target.value})}
          >
            {socios.map(s => <option key={s.id} value={s.id}>{s.nombre.toUpperCase()}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase font-black text-emerald-600 tracking-widest ml-1">Nombre del Plan</label>
          <input 
            type="text"
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
            value={form.nombre_dieta}
            onChange={e => setForm({...form, nombre_dieta: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MacroInput label="Objetivo KCAL" color="slate" value={form.calorias_objetivo} onChange={v => setForm({...form, calorias_objetivo: v})} />
        <MacroInput label="Proteína" color="blue" value={form.proteinas} onChange={v => setForm({...form, proteinas: v})} />
        <MacroInput label="Carbs" color="emerald" value={form.carbohidratos} onChange={v => setForm({...form, carbohidratos: v})} />
        <MacroInput label="Grasa" color="orange" value={form.grasas} onChange={v => setForm({...form, grasas: v})} />
      </div>

      <div className="flex items-center justify-between px-6 py-3 bg-slate-50 rounded-2xl">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Balance de Macros:</span>
        <span className={`text-xs font-black ${diferenciaKcal > 100 ? 'text-orange-500' : 'text-emerald-500'}`}>
          {kcalCalculadas} kcal calculadas {diferenciaKcal > 100 && '⚠️'}
        </span>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className={`w-full py-5 bg-emerald-500 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-600 transition-all uppercase tracking-widest text-xs ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Guardando...' : 'Establecer Plan Nutricional'}
      </button>
    </form>
  );
}

// Subcomponente interno para no repetir código de inputs
function MacroInput({ label, color, value, onChange }) {
  const colors = {
    slate: "bg-slate-900 text-white label-slate-500",
    blue: "bg-blue-50/50 border-blue-100 text-blue-600 label-blue-400",
    emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-600 label-emerald-400",
    orange: "bg-orange-50/50 border-orange-100 text-orange-600 label-orange-400"
  };

  return (
    <div className={`${colors[color]} p-6 rounded-[2rem] border text-center`}>
      <label className={`text-[9px] font-black uppercase block mb-1 opacity-70`}>{label}</label>
      <input 
        type="number" 
        className="w-full bg-transparent text-2xl font-black outline-none text-center" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}