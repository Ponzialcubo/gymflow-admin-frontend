import React from 'react';

export default function ClientMeasurementsModal({ isOpen, onClose, onSubmit, newMedicion = {}, setNewMedicion, usuarioNombre }) {
  
  // Solo para que el usuario lo vea en el cuadradito, pero no interfiere con el Guardado
  const peso = parseFloat(newMedicion?.peso_kg || 0);
  const altura = parseFloat(newMedicion?.altura_cm || 0);
  let imcVisual = '--';
  if (peso > 0 && altura > 0) {
    imcVisual = (peso / Math.pow(altura / 100, 2)).toFixed(1);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Nuevo Registro</h2>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 mb-8">Biometría de {usuarioNombre}</p>
        
        {/* onSubmit limpio y directo */}
        <form onSubmit={onSubmit} className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Peso (kg)</label>
              <input required step="0.1" type="number" className="w-full bg-slate-50 p-4 rounded-2xl font-black text-xl text-slate-800 outline-none focus:ring-2 ring-blue-100 text-center" value={newMedicion?.peso_kg || ''} onChange={(e) => setNewMedicion({...newMedicion, peso_kg: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Altura (cm)</label>
              <input required type="number" className="w-full bg-slate-50 p-4 rounded-2xl font-black text-xl text-slate-800 outline-none focus:ring-2 ring-blue-100 text-center" value={newMedicion?.altura_cm || ''} onChange={(e) => setNewMedicion({...newMedicion, altura_cm: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">% Grasa</label>
              <input required step="0.1" type="number" className="w-full bg-slate-50 p-4 rounded-2xl font-black text-xl text-slate-800 outline-none focus:ring-2 ring-blue-100 text-center" value={newMedicion?.grasa_porcentaje || ''} onChange={(e) => setNewMedicion({...newMedicion, grasa_porcentaje: e.target.value})} />
            </div>
            <div className="flex flex-col justify-center bg-blue-50 rounded-2xl p-4 text-center">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">IMC Calculado</span>
              <span className="text-2xl font-black text-blue-600">{imcVisual}</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Observaciones</label>
            <textarea className="w-full bg-slate-50 p-4 rounded-2xl font-medium text-sm text-slate-800 outline-none focus:ring-2 ring-blue-100 resize-none h-24" placeholder="Feedback del monitor..." value={newMedicion?.notas_monitor || ''} onChange={(e) => setNewMedicion({...newMedicion, notas_monitor: e.target.value})}></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all">Cancelar</button>
            <button type="submit" className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}