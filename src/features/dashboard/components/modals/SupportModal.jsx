import React, { useState } from 'react';
import axios from 'axios';

export default function SupportModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    asunto: '',
    prioridad: 'Normal',
    mensaje: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:3000/api/soporte', {
        ...formData,
        fecha: new Date().toISOString(),
        usuario_origen: 'Admin_Dashboard' 
      });
      
      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        setFormData({ asunto: '', prioridad: 'Normal', mensaje: '' });
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error al contactar soporte:", error);
      alert("Error al enviar el ticket. Revisa la conexión con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
        {!enviado ? (
          <>
            <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-3">Soporte Técnico</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Central de Ayuda GymFlow</p>
            
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="text-sm font-black text-blue-600 uppercase tracking-widest ml-1">¿Qué sucede?</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej. Error al cargar pagos"
                  className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-lg font-bold transition-all placeholder:text-slate-300"
                  value={formData.asunto}
                  onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-black text-blue-600 uppercase tracking-widest ml-1">Urgencia</label>
                <select 
                  className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-lg font-bold transition-all cursor-pointer"
                  value={formData.prioridad}
                  onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
                >
                  <option value="Baja">Baja - Consulta</option>
                  <option value="Normal">Normal - Duda técnica</option>
                  <option value="Alta">Alta - Error de sistema</option>
                  <option value="Critica">Crítica - Bloqueo total</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-black text-blue-600 uppercase tracking-widest ml-1">Descripción</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Describe el problema detalladamente..."
                  className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none text-lg font-medium transition-all resize-none placeholder:text-slate-300"
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                />
              </div>
              
              <div className="flex gap-6 pt-6">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-5 text-slate-400 font-black text-sm uppercase tracking-[0.15em] hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-5 bg-blue-600 text-white font-black rounded-3xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 text-sm uppercase tracking-[0.15em] disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting ? 'Enviando...' : 'Abrir Ticket'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-14 text-center animate-in fade-in zoom-in">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tighter">¡Ticket Recibido!</h3>
            <p className="text-slate-500 font-bold text-lg mt-3">Nuestro equipo técnico te contactará pronto.</p>
          </div>
        )}
      </div>
    </div>
  );
}