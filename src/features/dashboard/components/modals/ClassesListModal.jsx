import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../config/supabase';

export default function ClassesListModal({ isOpen, onClose }) {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para el día seleccionado (0 = Domingo, 1 = Lunes...)
  // Inicia en el día de hoy
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const diasSemana = [
    { id: 1, label: 'Lunes', short: 'L' },
    { id: 2, label: 'Martes', short: 'M' },
    { id: 3, label: 'Miércoles', short: 'X' },
    { id: 4, label: 'Jueves', short: 'J' },
    { id: 5, label: 'Viernes', short: 'V' },
    { id: 6, label: 'Sábado', short: 'S' },
    { id: 0, label: 'Domingo', short: 'D' },
  ];

  const fetchClases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clases_colectivas')
        .select('*')
        .order('horario', { ascending: true });

      if (error) throw error;
      setClases(data || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (isOpen) {
      fetchClases();
      // Reseteamos al día actual cada vez que se abre el modal
      setSelectedDay(new Date().getDay());
    }
  }, [isOpen]);

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

  // Filtrar las clases según el día que hayamos seleccionado
  const clasesDelDia = clases.filter(clase => new Date(clase.horario).getDay() === selectedDay);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[150] p-4">
      <div className="bg-white rounded-[3.5rem] p-12 w-full max-w-5xl shadow-2xl animate-in zoom-in duration-300 relative flex flex-col max-h-[90vh]">
        
        <button onClick={onClose} className="absolute top-10 right-10 text-3xl text-slate-300 hover:text-slate-900 transition-colors">✕</button>

        <div className="mb-8">
          <h2 className="text-6xl font-black text-slate-800 tracking-tighter">Agenda de Clases</h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mt-3">Programación Técnica Semanal</p>
        </div>

        {/* SELECTOR DE DÍAS (Estilo Premium) */}
        <div className="flex justify-between gap-2 p-2 bg-slate-50 rounded-[2rem] border border-slate-100 mb-8 flex-shrink-0">
          {diasSemana.map((dia) => (
            <button
              key={dia.id}
              onClick={() => setSelectedDay(dia.id)}
              className={`flex-1 py-4 rounded-[1.5rem] flex flex-col items-center transition-all ${
                selectedDay === dia.id 
                ? 'bg-white text-blue-600 shadow-md border border-slate-100 scale-105' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest mb-1">{dia.short}</span>
              <span className="text-sm font-black">{dia.label}</span>
            </button>
          ))}
        </div>

        {/* LISTA DE CLASES */}
        <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar space-y-5 pb-4">
          {loading ? (
             <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">Cargando parrilla...</div>
          ) : clasesDelDia.length > 0 ? (
            clasesDelDia.map((clase) => {
              const cat = getCategoryStyles(clase.nombre_clase);
              return (
                <div key={clase.id} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/10 transition-all">
                  
                  <div className="flex items-center gap-10">
                    <div className="flex flex-col items-center justify-center bg-slate-900 text-white w-32 h-32 rounded-[2rem] shadow-lg flex-shrink-0">
                      <span className="text-4xl font-black tracking-tighter">{formatTime(clase.horario)}</span>
                      <span className="text-[10px] font-black uppercase opacity-60 tracking-widest mt-1">{formatDate(clase.horario)}</span>
                    </div>

                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border ${cat.css}`}>
                        {cat.label}
                      </span>
                      <h3 className="text-4xl font-black text-slate-800 tracking-tight mt-4 group-hover:text-blue-600 transition-colors">
                        {clase.nombre_clase}
                      </h3>
                      <p className="text-base font-bold text-slate-400 mt-2 italic">con {clase.monitor_encargado}</p>
                    </div>
                  </div>

                  <div className="text-right pr-4">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-[0.2em] block mb-2 text-right">Cupos Max</span>
                    <span className="text-6xl font-black text-slate-800 tracking-tighter">{clase.capacidad_max}</span>
                  </div>
                </div>
              );
            })
          ) : (
            /* ESTADO VACÍO: Si un día no tiene clases (ej. Domingo por la tarde) */
            <div className="p-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center mt-4">
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No hay clases programadas para este día</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}