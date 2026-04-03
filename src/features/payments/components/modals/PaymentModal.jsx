import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PaymentModal({ isOpen, onClose, onPaymentAdded }) {
  const [formData, setFormData] = useState({
    id_usuario: '',
    tipo_plan: 'Estándar',
    precio: 29.99,
  });
  
  const [usuarios, setUsuarios] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:3000/api/usuarios')
        .then(res => {
          const socios = res.data.filter(u => u.rol === 'socio' || !u.rol);
          setUsuarios(socios);
        })
        .catch(err => console.error("Error cargando usuarios:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:3000/api/suscripciones', formData);
      setFormData({ id_usuario: '', tipo_plan: 'Estándar', precio: 29.99 });
      if (onPaymentAdded) onPaymentAdded(); 
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("⚠️ ATENCIÓN: " + error.response.data.error);
      } else {
        alert("❌ Hubo un error de conexión al registrar el cobro.");
      }
      console.error("Error al registrar pago:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      {/* 1. Contenedor aumentado a max-w-lg y redondeado Pro */}
      <div className="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl animate-in zoom-in duration-300">
        
        {/* 2. Título y subtítulo con la nueva escala */}
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-3">Registrar Pago</h2>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Nueva Suscripción</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            {/* 3. Labels a text-sm y más padding en select */}
            <label className="text-sm font-black text-emerald-600 uppercase tracking-widest ml-1">Seleccionar Socio</label>
            <select 
              required
              className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none text-lg font-bold transition-all appearance-none cursor-pointer"
              value={formData.id_usuario}
              onChange={(e) => setFormData({...formData, id_usuario: e.target.value})}
            >
              <option value="" disabled>Elige un socio de la lista...</option>
              {usuarios.map(u => (
                <option key={u.id} value={u.id}>{u.nombre} ({u.email})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-black text-emerald-600 uppercase tracking-widest ml-1">Plan</label>
              <select 
                className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none text-lg font-bold transition-all appearance-none cursor-pointer"
                value={formData.tipo_plan}
                onChange={(e) => {
                  const plan = e.target.value;
                  const precio = plan === 'Pro' ? 49.99 : plan === 'Estándar' ? 29.99 : 19.99;
                  setFormData({...formData, tipo_plan: plan, precio });
                }}
              >
                <option value="Basic">Basic</option>
                <option value="Estándar">Estándar</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-black text-emerald-600 uppercase tracking-widest ml-1">Importe (€)</label>
              <input 
                type="number"
                step="0.01"
                required
                className="w-full mt-3 p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none text-lg font-bold transition-all"
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: parseFloat(e.target.value)})}
              />
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
              disabled={isSubmitting || !formData.id_usuario}
              className="flex-1 py-5 bg-emerald-500 text-white font-black rounded-3xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 text-sm uppercase tracking-[0.15em] disabled:opacity-50 active:scale-95"
            >
              {isSubmitting ? 'Procesando...' : 'Cobrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}