import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import AddClassModal from './components/AddClassModal';

export default function CalendarSection() {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classToEdit, setClassToEdit] = useState(null);

  // --- 🧠 NUEVA LÓGICA DE FECHAS EXACTAS ---
  
  // 1. Buscamos el lunes de la semana que el usuario está viendo
  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para que la semana empiece en Lunes
    return new Date(d.setDate(diff));
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  
  // 2. Estado para el día exacto seleccionado (Arranca en hoy, formato YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState(() => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; 
    return new Date(Date.now() - tzoffset).toISOString().split('T')[0];
  });

  // 3. Generamos los 7 días de la semana basados en el currentWeekStart
  const generarDiasSemana = () => {
    const days = [];
    const labels = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const shorts = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(currentWeekStart);
      currentDate.setDate(currentWeekStart.getDate() + i);
      
      const tzoffset = currentDate.getTimezoneOffset() * 60000;
      const dateString = new Date(currentDate - tzoffset).toISOString().split('T')[0];

      days.push({
        dateString: dateString, // Ej: "2026-04-06"
        label: labels[currentDate.getDay()],
        short: shorts[currentDate.getDay()],
        dayNumber: currentDate.getDate() // Ej: 6
      });
    }
    return days;
  };

  const diasSemana = generarDiasSemana();

  // Funciones para navegar entre semanas
  const prevWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };
  
  // --- FIN LÓGICA DE FECHAS ---

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
    fetchClases();
  }, []);

  // 🛡️ EL ESCUDO: Filtramos comparando la FECHA EXACTA (YYYY-MM-DD), no el día de la semana
  const clasesDelDia = clases.filter(clase => {
    if (!clase.horario) return false;
    const claseDateStr = clase.horario.split('T')[0]; // Extraemos solo la parte de la fecha de Supabase
    return claseDateStr === selectedDate;
  });

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const handleOpenAdd = () => {
    setClassToEdit(null); 
    setIsModalOpen(true);
  };

  const handleOpenEdit = (clase) => {
    setClassToEdit(clase); 
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta sesión de la parrilla?")) return;
    try {
      const { error } = await supabase.from('clases_colectivas').delete().eq('id', id);
      if (error) throw error;
      fetchClases();
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20 space-y-8">
      
      {/* BARRA DE NAVEGACIÓN DE SEMANAS Y DÍAS */}
      <div className="flex flex-col xl:flex-row items-stretch gap-6">
        
        <div className="flex-1 flex bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden p-2">
          
          {/* Botón Semana Anterior */}
          <button onClick={prevWeek} className="px-4 text-slate-400 hover:bg-slate-100 hover:text-slate-800 rounded-2xl transition-all">
            <span className="text-2xl font-black">‹</span>
          </button>

          {/* Días de la semana dinámicos */}
          <div className="flex-1 flex justify-between gap-1 px-2">
            {diasSemana.map((dia) => (
              <button
                key={dia.dateString}
                onClick={() => setSelectedDate(dia.dateString)}
                className={`flex-1 py-4 rounded-[1.5rem] flex flex-col items-center justify-center transition-all ${
                  selectedDate === dia.dateString 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200/50 transform scale-105 z-10' 
                  : 'bg-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1 ${selectedDate === dia.dateString ? 'opacity-80' : ''}`}>
                  {dia.short} {dia.dayNumber}
                </span>
                <span className="text-lg font-black tracking-tight">{dia.label}</span>
              </button>
            ))}
          </div>

          {/* Botón Semana Siguiente */}
          <button onClick={nextWeek} className="px-4 text-slate-400 hover:bg-slate-100 hover:text-slate-800 rounded-2xl transition-all">
            <span className="text-2xl font-black">›</span>
          </button>

        </div>

        <button 
          onClick={handleOpenAdd}
          className="xl:w-auto w-full px-10 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3 min-h-[85px]"
        >
          <span className="text-3xl">+</span> Programar Clase
        </button>
      </div>

      {/* CONTENEDOR DE CLASES EXACTAMENTE IGUAL QUE ANTES */}
      <div className="w-full">
        {loading ? (
          <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">
            Sincronizando calendario...
          </div>
        ) : clasesDelDia.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {clasesDelDia.map((clase) => (
              <div key={clase.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 flex items-center justify-between hover:shadow-2xl hover:shadow-slate-200/60 hover:border-blue-200 transition-all group">
                
                <div className="flex items-center gap-8">
                  <div className="bg-slate-800 text-white w-24 h-24 md:w-28 md:h-28 rounded-3xl flex flex-col items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-2xl md:text-3xl font-black tracking-tighter">{formatTime(clase.horario)}</span>
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest mt-1">Inicio</span>
                  </div>

                  <div>
                    <h4 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                      {clase.nombre_clase}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4">
                      <span className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                        🏅 {clase.monitor_encargado}
                      </span>
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                        👥 Máx. {clase.capacidad_max}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleOpenEdit(clase)}
                    className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border hover:border-blue-100 transition-all shadow-sm text-xl"
                    title="Editar sesión"
                  >
                    ✎
                  </button>
                  <button 
                    onClick={() => handleDelete(clase.id)}
                    className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border hover:border-red-100 transition-all shadow-sm text-xl"
                    title="Eliminar sesión"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No hay clases programadas para este día</p>
            <button 
              onClick={handleOpenAdd}
              className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg inline-block"
            >
              + Añadir primera sesión
            </button>
          </div>
        )}
      </div>

      <AddClassModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onClassAdded={fetchClases}
        classToEdit={classToEdit} 
      />
    </div>
  );
}