import React from 'react';

export default function ClientDietModal({ isOpen, onClose, onSubmit, newDieta = {}, setNewDieta }) {
if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ajuste Nutricional</h2>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 mb-8">Macronutrientes objetivo</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Nombre del Plan</label>
            <input required type="text" placeholder="Ej: Definición Agresiva" className="w-full bg-slate-50 p-4 rounded-2xl font-black text-lg text-slate-800 outline-none focus:ring-2 ring-blue-100" value={newDieta.nombre_dieta || ''} onChange={(e) => setNewDieta({...newDieta, nombre_dieta: e.target.value})} />
          </div>

          <div>
            <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Calorías Totales</label>
            <input required type="number" placeholder="2500" className="w-full bg-slate-50 p-4 rounded-2xl font-black text-2xl text-slate-800 outline-none focus:ring-2 ring-blue-100" value={newDieta.calorias_objetivo || ''} onChange={(e) => setNewDieta({...newDieta, calorias_objetivo: e.target.value})} />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2 text-center">P (g)</label>
              <input type="number" className="w-full bg-slate-50 p-4 rounded-2xl font-black text-xl text-center text-slate-800 outline-none focus:ring-2 ring-blue-100" value={newDieta.proteinas || ''} onChange={(e) => setNewDieta({...newDieta, proteinas: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2 text-center">HC (g)</label>
              <input type="number" className="w-full bg-slate-50 p-4 rounded-2xl font-black text-xl text-center text-slate-800 outline-none focus:ring-2 ring-blue-100" value={newDieta.carbohidratos || ''} onChange={(e) => setNewDieta({...newDieta, carbohidratos: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2 text-center">G (g)</label>
              <input type="number" className="w-full bg-slate-50 p-4 rounded-2xl font-black text-xl text-center text-slate-800 outline-none focus:ring-2 ring-blue-100" value={newDieta.grasas || ''} onChange={(e) => setNewDieta({...newDieta, grasas: e.target.value})} />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all">Cancelar</button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">Guardar Plan</button>
          </div>
        </form>
      </div>
    </div>
  );
}