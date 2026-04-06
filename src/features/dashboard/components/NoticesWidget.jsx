import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase'; 

export default function NoticesWidget() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Descargar los avisos desde Supabase
  const fetchAvisos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('avisos')
        .select('*')
        .order('created_at', { ascending: false }); // Los más nuevos primero

      if (error) throw error;
      setAvisos(data || []);
    } catch (err) {
      console.error("Error al cargar avisos:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvisos();
  }, []);

  // Función para borrar un aviso
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este aviso?")) return;
    
    try {
      const { error } = await supabase.from('avisos').delete().eq('id', id);
      if (error) throw error;
      fetchAvisos(); // Recargar la lista tras borrar
    } catch (err) {
      alert("Error al borrar el aviso.");
    }
  };

  // Pequeña función para dar color según el tipo
  const getBadgeStyle = (tipo) => {
    switch(tipo) {
      case 'alerta': return 'bg-red-50 text-red-600 border-red-100';
      case 'evento': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100'; // info
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/20 border border-slate-100 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-32 bg-slate-100 rounded-3xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200/20 border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Comunicaciones</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
            Tablón Activo ({avisos.length})
          </p>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {avisos.length === 0 ? (
          <div className="text-center py-10">
            <span className="text-4xl block mb-2">📭</span>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No hay avisos activos</p>
          </div>
        ) : (
          avisos.map((aviso) => (
            <div key={aviso.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${getBadgeStyle(aviso.tipo)}`}>
                  {aviso.tipo}
                </span>
                <button 
                  onClick={() => handleDelete(aviso.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Borrar aviso"
                >
                  🗑️
                </button>
              </div>
              
              <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">
                {aviso.titulo}
              </h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed">
                {aviso.mensaje}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-200/50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Publicado: {new Date(aviso.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}