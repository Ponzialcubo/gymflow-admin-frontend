import React, { useState, useEffect } from 'react';
// Asegúrate de que la ruta a Supabase es correcta según tu estructura
import { supabase } from '../../../../config/supabase';

export default function AvisosListModal({ isOpen, onClose }) {
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
      console.error("Error al cargar avisos en el modal:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Recargamos los avisos cada vez que se abre el modal
  useEffect(() => {
    if (isOpen) {
      fetchAvisos();
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      {/* Contenedor del modal panorámico */}
      <div className="bg-white rounded-[3rem] p-12 w-full max-w-4xl shadow-2xl animate-in zoom-in duration-300 relative overflow-hidden flex flex-col">
        
        {/* Botón de cierre superior derecha */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-2xl text-slate-300 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>

        <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-10">Tablón de Avisos</h2>

        {/* Zona de contenido con scroll vertical */}
        <div className="flex-1 space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
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
              <div key={aviso.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all group relative">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${getBadgeStyle(aviso.tipo)}`}>
                    {aviso.tipo}
                  </span>
                  {/* Botón de borrar que aparece al hacer hover */}
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
    </div>
  );
}