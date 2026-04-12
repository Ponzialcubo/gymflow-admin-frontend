import React, { useState, useMemo } from 'react';

export default function TrainingForm({ 
  socios, ejercicios, form, setForm, diasSemana, 
  diasSeleccionados, toggleDia, loading, onSubmit 
}) {
  
  // 🔍 ESTADOS PARA LOS BUSCADORES
  const [socioSearch, setSocioSearch] = useState("");
  const [isSocioOpen, setIsSocioOpen] = useState(false);
  
  const [ejercicioSearch, setEjercicioSearch] = useState("");
  const [isEjercicioOpen, setIsEjercicioOpen] = useState(false);

  // 🧠 FILTRADO DE SOCIOS (Se activa al escribir 2 letras)
  const filteredSocios = useMemo(() => {
    if (socioSearch.length < 2) return [];
    return socios.filter(s => 
      s.nombre.toLowerCase().includes(socioSearch.toLowerCase())
    ).slice(0, 5);
  }, [socios, socioSearch]);

  // 🧠 FILTRADO DE EJERCICIOS
  // 🧠 FILTRADO DE EJERCICIOS (Versión Antiaérea 🚀)
  const filteredEjercicios = useMemo(() => {
  if (ejercicioSearch.length < 2) return [];
  
  return ejercicios.filter(e => {
    // Usamos ?. y || "" para que si el dato no existe, use un texto vacío y no explote
    const nombre = e?.nombre?.toLowerCase() || "";
    const grupo = e?.grupo_muscular?.toLowerCase() || "";
    const busqueda = ejercicioSearch.toLowerCase();

    return nombre.includes(busqueda) || grupo.includes(busqueda);
  }).slice(0, 5);
}, [ejercicios, ejercicioSearch]);

  return (
    <form onSubmit={onSubmit} className="p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="space-y-8">
          
          {/* 🔍 BUSCADOR DE SOCIO */}
          <div className="space-y-3 relative">
            <label className="text-[10px] uppercase font-black text-blue-600 tracking-widest ml-1">Socio / Atleta</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Escribe nombre del socio..."
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-700 focus:border-blue-500 transition-all"
                value={socioSearch}
                onChange={(e) => {
                  setSocioSearch(e.target.value);
                  setIsSocioOpen(true);
                }}
                onFocus={() => setIsSocioOpen(true)}
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30">👥</span>
            </div>

            {isSocioOpen && socioSearch.length >= 2 && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {filteredSocios.length > 0 ? (
                  filteredSocios.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      className="w-full p-4 text-left hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-none font-bold text-slate-700 text-sm uppercase"
                      onClick={() => {
                        setForm({...form, id_usuario: s.id});
                        setSocioSearch(s.nombre.toUpperCase());
                        setIsSocioOpen(false);
                      }}
                    >
                      {s.nombre}
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-400 font-bold text-xs italic">No se encuentra el socio</div>
                )}
              </div>
            )}
          </div>

          {/* 🔍 BUSCADOR DE EJERCICIO */}
          <div className="space-y-3 relative">
            <label className="text-[10px] uppercase font-black text-blue-600 tracking-widest ml-1">Ejercicio</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Buscar ejercicio (ej: Press, Sentadilla...)"
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-700 focus:border-blue-500 transition-all"
                value={ejercicioSearch}
                onChange={(e) => {
                  setEjercicioSearch(e.target.value);
                  setIsEjercicioOpen(true);
                }}
                onFocus={() => setIsEjercicioOpen(true)}
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30">💪</span>
            </div>

            {isEjercicioOpen && ejercicioSearch.length >= 2 && (
              <div className="absolute z-40 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {filteredEjercicios.map(e => (
                  <button
                    key={e.id}
                    type="button"
                    className="w-full p-4 text-left hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-none flex justify-between items-center"
                    onClick={() => {
                      setForm({...form, id_ejercicio: e.id});
                      setEjercicioSearch(e.nombre);
                      setIsEjercicioOpen(false);
                    }}
                  >
                    <span className="font-bold text-slate-700">{e.nombre}</span>
                    <span className="text-[9px] bg-slate-100 px-2 py-1 rounded-md font-black text-slate-400 uppercase">{e.grupo_muscular}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <VolumenInput label="Series" value={form.series} onChange={v => setForm({...form, series: v})} />
            <VolumenInput label="Repeticiones" value={form.repeticiones} onChange={v => setForm({...form, repeticiones: v})} />
          </div>
        </div>

        {/* COLUMNA DERECHA: DÍAS Y BOTÓN */}
        <div className="flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-black text-blue-600 tracking-widest ml-1">Días de entrenamiento</label>
            <div className="grid grid-cols-4 gap-2">
              {diasSemana.map(dia => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => toggleDia(dia)}
                  className={`py-4 rounded-xl text-xs lg:text-sm tracking-widest font-black transition-all border-2 ${
                    diasSeleccionados.includes(dia) 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                  }`}
                >
                  {dia.substring(0, 3).toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading || !form.id_usuario || !form.id_ejercicio}
            className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all uppercase tracking-widest text-md active:scale-95 ${
              (loading || !form.id_usuario || !form.id_ejercicio) ? 'opacity-50 pointer-events-none grayscale' : ''
            }`}
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
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center transition-all focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-lg">
      <label className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-widest">{label}</label>
      <input 
        type="number" 
        className="w-full bg-transparent text-3xl font-black text-slate-800 text-center outline-none" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}