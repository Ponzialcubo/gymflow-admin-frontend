import React from 'react';

export default function ClientDietModal({ isOpen, onClose, onSubmit, newDieta, setNewDieta }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tighter">Ajuste Nutricional</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Macronutrientes objetivo</p>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Nombre del Plan</label>
            <input required placeholder="Ej: Definición Agresiva" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500" value={newDieta.nombre_dieta} onChange={(e) => setNewDieta({...newDieta, nombre_dieta: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Calorías Totales</label>
            <input required type="number" placeholder="2500" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500" value={newDieta.calorias_objetivo} onChange={(e) => setNewDieta({...newDieta, calorias_objetivo: e.target.value})} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest ml-1 text-center block">P (g)</label>
                <input type="number" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-center" value={newDieta.proteinas} onChange={(e) => setNewDieta({...newDieta, proteinas: e.target.value})} />
            </div>
            <div className="space-y-2">
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest ml-1 text-center block">HC (g)</label>
                <input type="number" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-center" value={newDieta.carbohidratos} onChange={(e) => setNewDieta({...newDieta, carbohidratos: e.target.value})} />
            </div>
            <div className="space-y-2">
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest ml-1 text-center block">G (g)</label>
                <input type="number" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-center" value={newDieta.grasas} onChange={(e) => setNewDieta({...newDieta, grasas: e.target.value})} />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">Cancelar</button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Guardar Plan</button>
          </div>
        </form>
      </div>
    </div>
  );
}