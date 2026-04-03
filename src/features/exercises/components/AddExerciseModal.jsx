import React from 'react';

export default function AddExerciseModal({ isOpen, onClose, onSubmit, formData, setFormData }) {
  if (!isOpen) return null;

  const musculos = ['Pecho', 'Espalda', 'Pierna', 'Hombro', 'Brazos', 'Core'];

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter">Registrar Movimiento</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Expansión del catálogo técnico</p>
        
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Nombre</label>
              <input 
                required 
                type="text" 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold" 
                value={formData.nombre} 
                onChange={e => setFormData({...formData, nombre: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Grupo Muscular</label>
              <select 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold" 
                value={formData.grupo_muscular} 
                onChange={e => setFormData({...formData, grupo_muscular: e.target.value})}
              >
                {musculos.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">URL Imagen (Opcional)</label>
            <input 
              type="text" 
              placeholder="https://..." 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold" 
              value={formData.imagen_url} 
              onChange={e => setFormData({...formData, imagen_url: e.target.value})} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Descripción Técnica</label>
            <textarea 
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-xs font-medium h-24 resize-none" 
              value={formData.descripcion} 
              onChange={e => setFormData({...formData, descripcion: e.target.value})} 
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-colors"
            >
              Guardar en Base de Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}