export default function TrainingForm({ 
  socios, ejercicios, form, setForm, diasSemana, 
  diasSeleccionados, toggleDia, loading, onSubmit 
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* COLUMNA IZQUIERDA: SOCIO Y EJERCICIO */}
        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-xs uppercase font-black text-blue-600 tracking-widest ml-1">Seleccionar Socio</label>
            <select 
              className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-lg text-slate-800 focus:border-blue-500 focus:bg-white transition-all appearance-none"
              value={form.id_usuario}
              onChange={e => setForm({...form, id_usuario: e.target.value})}
            >
              {socios.map(s => <option key={s.id} value={s.id}>{s.nombre.toUpperCase()}</option>)}
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-xs uppercase font-black text-blue-600 tracking-widest ml-1">Ejercicio Objetivo</label>
            <select 
              className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-lg text-slate-800 focus:border-blue-500 focus:bg-white transition-all appearance-none"
              value={form.id_ejercicio}
              onChange={e => setForm({...form, id_ejercicio: e.target.value})}
            >
              {ejercicios.map(e => <option key={e.id} value={e.id}>{e.nombre} — {e.grupo_muscular.toUpperCase()}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <VolumenInput label="Series" value={form.series} onChange={v => setForm({...form, series: v})} />
            <VolumenInput label="Repeticiones" value={form.repeticiones} onChange={v => setForm({...form, repeticiones: v})} />
          </div>
        </div>

        {/* COLUMNA DERECHA: DÍAS Y CONFIRMACIÓN */}
        <div className="flex flex-col justify-between space-y-10">
          <div className="space-y-6">
            <label className="text-xs uppercase font-black text-blue-600 tracking-widest ml-1 block">Frecuencia Semanal</label>
            <div className="grid grid-cols-4 gap-3">
              {diasSemana.map(dia => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => toggleDia(dia)}
                  className={`py-6 rounded-2xl text-xs font-black transition-all border-2 ${
                    diasSeleccionados.includes(dia) 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 scale-105' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
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
            className={`w-full py-7 bg-blue-600 text-white font-black rounded-[2rem] shadow-2xl shadow-blue-200 hover:bg-slate-900 transition-all uppercase tracking-[0.2em] text-sm ${loading ? 'opacity-50' : 'hover:-translate-y-1'}`}
          >
            {loading ? 'Procesando Plan...' : 'Confirmar Planificación'}
          </button>
        </div>
      </div>
    </form>
  );
}

function VolumenInput({ label, value, onChange }) {
  return (
    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center group hover:bg-white hover:border-blue-200 transition-all">
      <label className="text-xs font-black text-slate-400 uppercase block mb-2 tracking-widest">{label}</label>
      <input 
        type="number" 
        className="w-full bg-transparent text-6xl font-black text-slate-800 text-center outline-none" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}