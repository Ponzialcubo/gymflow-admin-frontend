import React from 'react';

export default function ClientWorkoutModal({ isOpen, onClose, onSubmit, newRutina, setNewRutina, ejerciciosCatalogo, ordenDias, usuarioNombre }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tighter">Asignar Ejercicio</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Configuración de carga para {usuarioNombre}</p>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Seleccionar Movimiento</label>
            <select required className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" value={newRutina.id_ejercicio} onChange={(e) => setNewRutina({...newRutina, id_ejercicio: e.target.value})}>
                <option value="">Buscar en catálogo...</option>
                {ejerciciosCatalogo.map(e => <option key={e.id} value={e.id}>{e.nombre.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Día</label>
                <select className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500 transition-all" value={newRutina.dia_semana} onChange={(e) => setNewRutina({...newRutina, dia_semana: e.target.value})}>
                    {ordenDias.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Volumen (S x R)</label>
                <div className="flex gap-2">
                    <input required type="number" placeholder="S" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-center" value={newRutina.series} onChange={(e) => setNewRutina({...newRutina, series: e.target.value})} />
                    <input required type="number" placeholder="R" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-center" value={newRutina.repeticiones} onChange={(e) => setNewRutina({...newRutina, repeticiones: e.target.value})} />
                </div>
              </div>
          </div>
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">Cerrar</button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700">Asignar</button>
          </div>
        </form>
      </div>
    </div>
  );
}