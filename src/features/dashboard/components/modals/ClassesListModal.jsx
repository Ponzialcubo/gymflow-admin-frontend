import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../config/supabase';

export default function ClassesListModal({ isOpen, onClose }) {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clases_colectivas')
        .select('*')
        .gte('horario', new Date().toISOString()) 
        .order('horario', { ascending: true });

      if (error) throw error;
      setClases(data || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isOpen) fetchClases(); }, [isOpen]);

  // Lógica de colores por categoría basada en tu lista
  const getCategoryStyles = (nombre) => {
    const n = nombre.toLowerCase();
    if (n.includes('yoga') || n.includes('pilates') || n.includes('balance')) 
      return { label: 'Mente & Cuerpo', css: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
    if (n.includes('pump') || n.includes('gap') || n.includes('funcional') || n.includes('cross')) 
      return { label: 'Fuerza & Tonificación', css: 'bg-blue-50 text-blue-600 border-blue-100' };
    return { label: 'Cardio & HIIT', css: 'bg-rose-50 text-rose-600 border-rose-100' };
  };

  const formatTime = (ts) => new Date(ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const formatDate = (ts) => new Date(ts).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[150] p-4">
      <div className="bg-white rounded-[3.5rem] p-10 w-full max-w-5xl shadow-2xl animate-in zoom-in duration-300 relative flex flex-col max-h-[85vh]">
        
        <button onClick={onClose} className="absolute top-10 right-10 text-3xl text-slate-300 hover:text-slate-900 transition-colors">✕</button>

        <div className="mb-10">
          <h2 className="text-5xl font-black text-slate-800 tracking-tighter">Agenda de Clases</h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Programación Técnica Semanal</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-3">
          {loading ? (
             <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">Cargando parrilla...</div>
          ) : (
            clases.map((clase) => {
              const cat = getCategoryStyles(clase.nombre_clase);
              return (
                <div key={clase.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all">
                  
                  <div className="flex items-center gap-8">
                    {/* Reloj */}
                    <div className="flex flex-col items-center justify-center bg-slate-900 text-white w-24 h-24 rounded-3xl shadow-lg">
                      <span className="text-2xl font-black tracking-tighter">{formatTime(clase.horario)}</span>
                      <span className="text-[8px] font-black uppercase opacity-60 tracking-widest">{formatDate(clase.horario)}</span>
                    </div>

                    <div>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${cat.css}`}>
                        {cat.label}
                      </span>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-2 group-hover:text-blue-600 transition-colors">
                        {clase.nombre_clase}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 mt-1 italic">con {clase.monitor_encargado}</p>
                    </div>
                  </div>

                  {/* Cupos */}
                  <div className="text-right">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] block mb-1 text-right">Cupos Max</span>
                    <span className="text-3xl font-black text-slate-800">{clase.capacidad_max}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}