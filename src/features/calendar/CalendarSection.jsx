import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import AddClassModal from './components/AddClassModal';

export default function CalendarSection() {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // NUEVO: Estado para saber si estamos editando una clase existente
  const [classToEdit, setClassToEdit] = useState(null);
  
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
    fetchClases();
  }, []);

  const clasesDelDia = clases.filter(clase => new Date(clase.horario).getDay() === selectedDay);

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  // NUEVAS FUNCIONES DE ACCIÓN
  const handleOpenAdd = () => {
    setClassToEdit(null); // Limpiamos para que sea una clase nueva
    setIsModalOpen(true);
  };

  const handleOpenEdit = (clase) => {
    setClassToEdit(clase); // Pasamos los datos de la clase a editar
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
    <div className="animate-in fade-in zoom-in duration-700 pb-20 w-full h-full">
      
      <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <div>
            <h3 className="text-4xl font-black text-slate-800 tracking-tighter">Planificación Semanal</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Horarios y Gestión de Sesiones</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-3"
          >
            <span className="text-xl">+</span> Programar Clase
          </button>
        </div>

        <div className="flex justify-between gap-2 p-2 bg-slate-50 rounded-[2rem] border border-slate-100">
          {diasSemana.map((dia) => (
            <button
              key={dia.id}
              onClick={() => setSelectedDay(dia.id)}
              className={`flex-1 py-4 rounded-[1.5rem] flex flex-col items-center transition-all ${
                selectedDay === dia.id 
                ? 'bg-white text-blue-600 shadow-md border border-slate-100 scale-105' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest mb-1">{dia.short}</span>
              <span className="text-sm font-black">{dia.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        {loading ? (
          <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">
            Sincronizando calendario...
          </div>
        ) : clasesDelDia.length > 0 ? (
          /* NUEVO: grid-cols-1 para móviles, xl:grid-cols-2 para pantallas grandes */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {clasesDelDia.map((clase) => (
              <div key={clase.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between hover:shadow-xl hover:border-blue-200 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="bg-slate-900 text-white w-20 h-20 md:w-24 md:h-24 rounded-3xl flex flex-col items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-xl md:text-2xl font-black tracking-tighter">{formatTime(clase.horario)}</span>
                    <span className="text-[9px] font-black uppercase opacity-50">Inicio</span>
                  </div>

                  <div>
                    <h4 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                      {clase.nombre_clase}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                        🏅 {clase.monitor_encargado}
                      </span>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        👥 Máx. {clase.capacidad_max} personas
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTONES FUNCIONALES */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenEdit(clase)}
                    className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                    title="Editar sesión"
                  >
                    ✎
                  </button>
                  <button 
                    onClick={() => handleDelete(clase.id)}
                    className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
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
              className="mt-4 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
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
        classToEdit={classToEdit} // Pasamos la clase que queremos editar
      />
    </div>
  );
}