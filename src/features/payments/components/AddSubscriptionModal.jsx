import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../../config/supabase'; 

export default function AddSubscriptionModal({ isOpen, onClose, users, newSub, setNewSub, onSubmit }) {
  const [prices, setPrices] = useState({ Basic: 0, Estándar: 0, Pro: 0 });
  const [loadingPrices, setLoadingPrices] = useState(true);
  
  // 🔍 ESTADOS PARA LA BÚSQUEDA
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // Limpiar búsqueda al cerrar
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!loadingPrices && newSub.tipo_plan && prices[newSub.tipo_plan] !== undefined) {
      setNewSub(prev => ({ ...prev, precio: prices[newSub.tipo_plan] }));
    }
  }, [newSub.tipo_plan, prices, loadingPrices, setNewSub]);

  // 🧠 FILTRADO DE USUARIOS EN TIEMPO REAL
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return [];
    return users.filter(u => 
      u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Solo mostramos los 5 mejores resultados para no saturar
  }, [users, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3.5rem] p-12 w-full max-w-md shadow-2xl animate-in zoom-in duration-300 relative">
        
        <button onClick={onClose} className="absolute top-10 right-10 text-3xl text-slate-300 hover:text-slate-600 transition-colors">✕</button>

        <div className="mb-10">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Nueva Membresía</h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
            Alta de pago recurrente
          </p>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-8">
          
          {/* 🔍 BUSCADOR DE SOCIO */}
          <div className="space-y-3 relative">
            <label className="text-xs font-black text-blue-600 uppercase ml-1 tracking-widest block">
              Localizar Socio
            </label>
            
            <div className="relative">
              <input 
                type="text"
                placeholder="Escribe nombre o email..."
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-base font-bold text-slate-700 outline-none focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl opacity-30">🔍</span>
            </div>

            {/* LISTA DE RESULTADOS FLOTANTE */}
            {isDropdownOpen && searchTerm.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(u => (
                    <button
                      key={u.id}
                      type="button"
                      className="w-full p-4 text-left hover:bg-blue-50 transition-colors flex flex-col border-b border-slate-50 last:border-none"
                      onClick={() => {
                        setNewSub({...newSub, id_usuario: u.id});
                        setSearchTerm(u.nombre.toUpperCase());
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span className="font-black text-slate-800 text-sm">{u.nombre.toUpperCase()}</span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-tight">{u.email}</span>
                    </button>
                  ))
                ) : (
                  <div className="p-5 text-center text-slate-400 font-bold text-xs uppercase italic">
                    No hay coincidencias
                  </div>
                )}
              </div>
            )}
            
            {/* Feedback visual de socio seleccionado */}
            {newSub.id_usuario && !isDropdownOpen && (
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">
                ✓ Socio seleccionado correctamente
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
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
              disabled={!newSub.id_usuario}
              className={`flex-2 px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
                newSub.id_usuario 
                ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
              }`}
            >
              Activar Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );