export default function TrainingForm({ 
  socios, ejercicios, form, setForm, diasSemana, 
  diasSeleccionados, toggleDia, loading, onSubmit 
}) {
  return (
    <form onSubmit={onSubmit} className="p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-black text-blue-600 tracking-widest ml-1">Socio</label>
            <select 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-700 focus:border-blue-500"
              value={form.id_usuario}
              onChange={e => setForm({...form, id_usuario: e.target.value})}
            >
              {socios.map(s => <option key={s.id} value={s.id}>{s.nombre.toUpperCase()}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase font-black text-blue-600 tracking-widest ml-1">Ejercicio</label>
            <select 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-700 focus:border-blue-500"
              value={form.id_ejercicio}
              onChange={e => setForm({...form, id_ejercicio: e.target.value})}
            >
              {ejercicios.map(e => <option key={e.id} value={e.id}>{e.nombre} ({e.grupo_muscular})</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <VolumenInput label="Series" value={form.series} onChange={v => setForm({...form, series: v})} />
            <VolumenInput label="Repeticiones" value={form.repeticiones} onChange={v => setForm({...form, repeticiones: v})} />
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-black text-blue-600 tracking-widest ml-1">Días de entrenamiento</label>
            <div className="grid grid-cols-4 gap-2">
              {diasSemana.map(dia => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => toggleDia(dia)}
                  className={`py-4 rounded-xl text-[10px] font-black transition-all border-2 ${
                    diasSeleccionados.includes(dia) 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-400'
                  }`}
                >
                  {dia.substring(0, 3).toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest text-xs ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Sincronizando...' : 'Confirmar Planificación'}
          </button>
        </div>
      </div>
    </form>
  );
}

function VolumenInput({ label, value, onChange }) {
  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
      <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">{label}</label>
      <input 
        type="number" 
        className="w-full bg-transparent text-3xl font-black text-slate-800 text-center outline-none" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}