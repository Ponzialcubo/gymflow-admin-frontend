import React, { useState } from 'react';
import axios from 'axios';

export default function NoticeModal({ isOpen, onClose, onNoticeAdded }) {
  const [formData, setFormData] = useState({
    titulo: '',
    mensaje: '',
    tipo: 'info' // info, alerta, evento
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:3000/api/avisos', formData);
      setFormData({ titulo: '', mensaje: '', tipo: 'info' });
      if (onNoticeAdded) onNoticeAdded();
      onClose();
    } catch (error) {
      console.error("Error al crear aviso:", error);
      alert("Hubo un error al publicar el aviso.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
        
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-3">Crear Aviso</h2>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Comunicación a Socios</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-sm font-black text-slate-600 uppercase tracking-widest ml-1">Título del Aviso</label>
            <input 
              required
              type="text" 
              maxLength={50}
              placeholder="Ej. Cierre por festivo"
              className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-500 outline-none text-lg font-bold transition-all placeholder:text-slate-300"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-black text-slate-600 uppercase tracking-widest ml-1">Mensaje</label>
            <textarea 
              required
              rows="3"
              placeholder="Detalles de la comunicación..."
              className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-500 outline-none text-lg font-medium transition-all resize-none placeholder:text-slate-300"
              value={formData.mensaje}
              onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-black text-slate-600 uppercase tracking-widest ml-1 mb-3 block">Tipo de Aviso</label>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, tipo: 'info'})}
                className={`py-4 rounded-2xl text-sm font-black uppercase tracking-widest border-2 transition-all active:scale-95 ${formData.tipo === 'info' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-slate-100 text-slate-400 hover:border-slate-300'}`}
              >
                Info
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, tipo: 'alerta'})}
                className={`py-4 rounded-2xl text-sm font-black uppercase tracking-widest border-2 transition-all active:scale-95 ${formData.tipo === 'alerta' ? 'bg-red-50 border-red-500 text-red-700' : 'border-slate-100 text-slate-400 hover:border-slate-300'}`}
              >
                Alerta
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, tipo: 'evento'})}
                className={`py-4 rounded-2xl text-sm font-black uppercase tracking-widest border-2 transition-all active:scale-95 ${formData.tipo === 'evento' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-slate-100 text-slate-400 hover:border-slate-300'}`}
              >
                Evento
              </button>
            </div>
          </div>
          
          <div className="flex gap-6 pt-6">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-5 text-slate-400 font-black text-sm uppercase tracking-[0.15em] hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-5 bg-slate-900 text-white font-black rounded-3xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 text-sm uppercase tracking-[0.15em] disabled:opacity-50 active:scale-95"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}