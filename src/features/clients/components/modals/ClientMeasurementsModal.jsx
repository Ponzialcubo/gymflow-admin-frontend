import React, { useMemo } from 'react';

// Añadimos = {} a newMedicion para que nunca sea "undefined" y no rompa la app
export default function ClientMeasurementsModal({ isOpen, onClose, onSubmit, newMedicion = {}, setNewMedicion, usuarioNombre }) {
  
  // Calculamos el IMC protegiendo las variables con el símbolo de interrogación (?.)
  const imcCalculado = useMemo(() => {
    const peso = parseFloat(newMedicion?.peso_kg);
    const alturaCm = parseFloat(newMedicion?.altura_cm);
    
    if (peso > 0 && alturaCm > 0) {
      const alturaM = alturaCm / 100;
      return (peso / (alturaM * alturaM)).toFixed(1);
    }
    return '--';
  }, [newMedicion?.peso_kg, newMedicion?.altura_cm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Nuevo Registro</h2>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 mb-8">Biometría de {usuarioNombre}</p>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...newMedicion, imc: imcCalculado !== '--' ? imcCalculado : null });
        }} className="space-y-6">
          
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
              <span className="text-2xl font-black text-blue-600">{imcCalculado}</span>
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