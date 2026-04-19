import React from 'react';
import ModalLayout from '../../../components/ui/ModalLayout';

export default function AddExerciseModal({ isOpen, onClose, onSubmit, formData, setFormData }) {
  const musculos = ['Pecho', 'Espalda', 'Pierna', 'Hombro', 'Brazos', 'Core'];

  return (
    <ModalLayout isOpen={isOpen} maxWidth="2xl">
        <h2 className="text-3xl xl:text-4xl font-black text-slate-800 mb-2 tracking-tighter">Registrar Movimiento</h2>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Expansión del catálogo técnico</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Nombre del Ejercicio</label>
              <input 
                required 
                type="text" 
                placeholder="Ej. Sentadilla Búlgara"
                className="w-full bg-slate-50 p-4 rounded-2xl font-black text-xl text-slate-800 outline-none focus:ring-2 ring-blue-100" 
                value={formData.nombre} 
                onChange={e => setFormData({...formData, nombre: e.target.value})} 
              />
            </div>
            <div>
              <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Grupo Muscular</label>
              <select 
                className="w-full bg-slate-50 p-4 rounded-2xl font-black text-xl text-slate-800 outline-none focus:ring-2 ring-blue-100 cursor-pointer" 
                value={formData.grupo_muscular} 
                onChange={e => setFormData({...formData, grupo_muscular: e.target.value})}
              >
                {musculos.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          
          <div>
            <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">URL Imagen (Opcional)</label>
            <input 
              type="text" 
              placeholder="https://..." 
              className="w-full bg-slate-50 p-4 rounded-2xl font-black text-lg text-slate-800 outline-none focus:ring-2 ring-blue-100" 
              value={formData.imagen_url} 
              onChange={e => setFormData({...formData, imagen_url: e.target.value})} 
            />
          </div>

          <div>
            <label className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Descripción Técnica</label>
            <textarea 
              placeholder="Detalles sobre la ejecución..."
              className="w-full bg-slate-50 p-4 rounded-2xl font-medium text-sm text-slate-800 outline-none focus:ring-2 ring-blue-100 h-28 resize-none" 
              value={formData.descripcion} 
              onChange={e => setFormData({...formData, descripcion: e.target.value})} 
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-colors"
            >
              Guardar Ejercicio
            </button>
          </div>
        </form>
    </ModalLayout>
  );
}