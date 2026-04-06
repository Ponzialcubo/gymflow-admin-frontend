import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase'; 

export default function AddSubscriptionModal({ isOpen, onClose, users, newSub, setNewSub, onSubmit }) {
  const [prices, setPrices] = useState({ Basic: 0, Estándar: 0, Pro: 0 });
  const [loadingPrices, setLoadingPrices] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      if (!isOpen) return;
      try {
        setLoadingPrices(true);
        const { data, error } = await supabase
          .from('gym_settings')
          .select('precio_basic, precio_estandar, precio_pro')
          .eq('id', 1)
          .single();
          
        if (data && !error) {
          setPrices({
            Basic: data.precio_basic,
            Estándar: data.precio_estandar,
            Pro: data.precio_pro
          });
        }
      } catch (err) {
        console.error("Error al descargar precios:", err);
      } finally {
        setLoadingPrices(false);
      }
    };

    fetchPrices();
  }, [isOpen]);

  useEffect(() => {
    if (!loadingPrices && newSub.tipo_plan && prices[newSub.tipo_plan] !== undefined) {
      setNewSub(prev => ({ ...prev, precio: prices[newSub.tipo_plan] }));
    }
  }, [newSub.tipo_plan, prices, loadingPrices, setNewSub]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3.5rem] p-12 w-full max-w-md shadow-2xl animate-in zoom-in duration-300 relative">
        
        {/* Botón sutil para cerrar */}
        <button onClick={onClose} className="absolute top-10 right-10 text-3xl text-slate-300 hover:text-slate-600 transition-colors">✕</button>

        {/* Encabezado: Igualamos el tamaño a "Alta de Socio" */}
        <div className="mb-10">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Nueva Membresía</h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
            Alta de pago recurrente
          </p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-8">
          {/* Seleccionar Socio */}
          <div className="space-y-3">
            <label className="text-xs font-black text-blue-600 uppercase ml-1 tracking-widest block">
              Seleccionar Socio
            </label>
            <select 
              required
              className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-base font-bold text-slate-700 outline-none focus:border-blue-500 transition-all cursor-pointer appearance-none"
              value={newSub.id_usuario}
              onChange={e => setNewSub({...newSub, id_usuario: e.target.value})}
            >
              <option value="">Buscar socio...</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.nombre.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Plan */}
            <div className="space-y-3">
              <label className="text-xs font-black text-blue-600 uppercase ml-1 tracking-widest block">
                Plan
              </label>
              <select 
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-base font-bold text-slate-700 outline-none focus:border-blue-500 transition-all cursor-pointer appearance-none"
                value={newSub.tipo_plan}
                onChange={e => setNewSub({...newSub, tipo_plan: e.target.value})}
              >
                <option value="Basic">Basic</option>
                <option value="Estándar">Estándar</option>
                <option value="Pro">Pro</option>
              </select>
            </div>

            {/* Importe */}
            <div className="space-y-3">
              <label className="text-xs font-black text-blue-600 uppercase ml-1 tracking-widest block">
                Importe (€)
              </label>
              <input 
                type="number" 
                step="0.01"
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-base font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                value={newSub.precio}
                onChange={e => setNewSub({...newSub, precio: e.target.value})}
              />
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center gap-6 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-5 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-2 px-8 py-5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
            >
              Activar Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}