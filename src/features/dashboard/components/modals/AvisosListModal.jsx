import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../config/supabase';

export default function AvisosListModal({ isOpen, onClose }) {
  // ... (toda tu lógica de fetchAvisos, handleDelete, getBadgeStyle se queda igual) ...
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAvisos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('avisos').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setAvisos(data || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isOpen) fetchAvisos(); }, [isOpen]);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este aviso?")) return;
    try {
      const { error } = await supabase.from('avisos').delete().eq('id', id);
      if (error) throw error;
      fetchAvisos();
    } catch (err) {
      alert("Error al borrar.");
    }
  };

  const getBadgeStyle = (tipo) => {
    switch(tipo) {
      case 'alerta': return 'bg-red-50 text-red-600 border-red-100';
      case 'evento': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100'; 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-12 w-full max-w-4xl shadow-2xl animate-in zoom-in duration-300 relative overflow-hidden flex flex-col">
        
        <button onClick={onClose} className="absolute top-8 right-8 text-2xl text-slate-300 hover:text-slate-600 transition-colors">
          ✕
        </button>

        {/* NUEVO TAMAÑO: text-6xl (antes 5xl) */}
        <h2 className="text-6xl font-black text-slate-800 tracking-tighter mb-10">Tablón de Avisos</h2>

        <div className="flex-1 space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
          {loading ? (
              <div className="text-center py-10">
                <span className="text-4xl block mb-2">⏳</span>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Cargando avisos...</p>
              </div>
          ) : avisos.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-4xl block mb-2">📭</span>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No hay avisos activos</p>
            </div>
          ) : (
            avisos.map((aviso) => (
              <div key={aviso.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all group relative">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border ${getBadgeStyle(aviso.tipo)}`}>
                    {aviso.tipo}
                  </span>
                  <button onClick={() => handleDelete(aviso.id)} className="text-2xl text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                    🗑️
                  </button>
                </div>
                
                {/* NUEVO TAMAÑO: text-3xl (antes 2xl) */}
                <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-3">
                  {aviso.titulo}
                </h3>
                
                {/* NUEVO TAMAÑO: text-base (antes text-sm) */}
                <p className="text-base font-bold text-slate-500 leading-relaxed">
                  {aviso.mensaje}
                </p>
                
                <div className="mt-6 pt-5 border-t border-slate-200/50">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">
                    Publicado: {new Date(aviso.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}