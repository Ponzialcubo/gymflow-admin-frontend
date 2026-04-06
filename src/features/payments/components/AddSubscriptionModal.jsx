import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase'; 

export default function AddSubscriptionModal({ isOpen, onClose, users, newSub, setNewSub, onSubmit }) {
  // Estado para guardar los precios que vienen de Configuración
  const [prices, setPrices] = useState({ Basic: 0, Estándar: 0, Pro: 0 });
  const [loadingPrices, setLoadingPrices] = useState(true);

  // 1. Descargar los precios de Supabase al abrir el modal
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

  // 2. Autocompletar el precio usando los datos descargados
  useEffect(() => {
    // Si ya cargaron los precios y el usuario seleccionó un plan
    if (!loadingPrices && newSub.tipo_plan && prices[newSub.tipo_plan] !== undefined) {
      setNewSub(prev => ({ ...prev, precio: prices[newSub.tipo_plan] }));
    }
  }, [newSub.tipo_plan, prices, loadingPrices, setNewSub]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in duration-300 relative">
        
        {/* Botón sutil para cerrar */}
        <button onClick={onClose} className="absolute top-8 right-8 text-2xl text-slate-300 hover:text-slate-600">✕</button>

        {/* Encabezado ajustado (Menos dominante) */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Nueva Membresía</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Alta de pago recurrente</p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase ml-1 tracking-widest">Seleccionar Socio</label>
            <select 
              required
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black text-slate-700 outline-none focus:border-blue-500 transition-all cursor-pointer"
              value={newSub.id_usuario}
              onChange={e => setNewSub({...newSub, id_usuario: e.target.value})}
            >
              <option value="">Buscar socio...</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase ml-1 tracking-widest">Plan</label>
              <select 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black text-slate-700 outline-none focus:border-blue-500 transition-all cursor-pointer"
                value={newSub.tipo_plan}
                onChange={e => setNewSub({...newSub, tipo_plan: e.target.value})}
              >
                <option value="Basic">Basic</option>
                <option value="Estándar">Estándar</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1 tracking-widest">Importe (€)</label>
              <input 
                type="number" 
                step="0.01"
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-black text-slate-700 outline-none focus:border-slate-400 transition-all"
                value={newSub.precio}
                onChange={e => setNewSub({...newSub, precio: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-slate-400 bg-slate-50 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-slate-900 transition-all active:scale-95">
              Activar Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}