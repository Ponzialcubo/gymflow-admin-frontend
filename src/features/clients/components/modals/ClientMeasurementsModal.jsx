import React from 'react';

export default function ClientMeasurementsModal({ isOpen, onClose, onSubmit, newMedicion, setNewMedicion, usuarioNombre }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tighter">Nuevo Registro</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Biometría de {usuarioNombre}</p>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Peso (kg)</label>
              <input required step="0.1" type="number" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-center" value={newMedicion.peso_kg} onChange={(e) => setNewMedicion({...newMedicion, peso_kg: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">% Grasa</label>
              <input required step="0.1" type="number" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-center" value={newMedicion.grasa_porcentaje} onChange={(e) => setNewMedicion({...newMedicion, grasa_porcentaje: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Observaciones</label>
            <textarea className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-medium outline-none h-24 resize-none" placeholder="Feedback del monitor..." value={newMedicion.notas_monitor} onChange={(e) => setNewMedicion({...newMedicion, notas_monitor: e.target.value})}></textarea>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">Cancelar</button>
            <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}