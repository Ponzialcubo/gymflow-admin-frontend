import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase';
import AddEmployeeModal from './AddEmployeeModal';

export default function StaffSettings() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Nuevo estado para controlar qué menú de opciones está abierto
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('empleados')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStaff(data || []);
    } catch (err) {
      console.error("Error al cargar empleados:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Función para eliminar un empleado
  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este empleado por completo?")) return;
    
    try {
      const { error } = await supabase.from('empleados').delete().eq('id', id);
      if (error) throw error;
      
      setOpenMenuId(null); // Cerramos el menú
      fetchStaff(); // Recargamos la lista
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    }
  };

  // Función para alternar entre Activo / Inactivo
  const handleToggleStatus = async (empleado) => {
    const nuevoEstado = empleado.estado === 'activo' ? 'inactivo' : 'activo';
    
    try {
      const { error } = await supabase
        .from('empleados')
        .update({ estado: nuevoEstado })
        .eq('id', empleado.id);

      if (error) throw error;
      
      setOpenMenuId(null); // Cerramos el menú
      fetchStaff(); // Recargamos la lista
    } catch (error) {
      alert("Error al cambiar estado: " + error.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
        {/* Cabecera */}
        <div className="mb-10 border-b border-slate-100 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Plantilla y Monitores</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Gestiona los accesos de tus empleados</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
          >
            <span className="text-lg">+</span> Nuevo Empleado
          </button>
        </div>

        {/* Lista de Empleados */}
        {loading ? (
          <div className="text-center py-20 animate-pulse font-black text-slate-300 uppercase tracking-widest">
            Cargando equipo...
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative">
            {staff.map((empleado) => (
              <div key={empleado.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col justify-between hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all group relative">
                
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-sm
                      ${empleado.estado === 'activo' ? 'bg-slate-800' : 'bg-slate-300'}`}
                    >
                      {empleado.nombre.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-800 tracking-tight">{empleado.nombre}</h4>
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">
                        {empleado.rol}
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenedor del botón de opciones y el menú desplegable */}
                  <div className="relative">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === empleado.id ? null : empleado.id)}
                      className="text-slate-300 hover:text-slate-800 transition-colors px-2 py-1 rounded-lg"
                    >
                      •••
                    </button>

                    {/* Menú desplegable */}
                    {openMenuId === empleado.id && (
                      <>
                        {/* Overlay invisible para cerrar al hacer clic fuera */}
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setOpenMenuId(null)}
                        ></div>
                        
                        {/* Dropdown */}
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          <button 
                            onClick={() => handleToggleStatus(empleado)}
                            className="w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 border-b border-slate-50 transition-colors"
                          >
                            {empleado.estado === 'activo' ? 'Dar de baja' : 'Reactivar'}
                          </button>
                          <button 
                            onClick={() => handleDelete(empleado.id)}
                            className="w-full text-left px-5 py-3 text-xs font-black uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 truncate pr-4">{empleado.email}</p>
                  
                  <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border
                    ${empleado.estado === 'activo' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${empleado.estado === 'activo' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    {empleado.estado}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      <AddEmployeeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmployeeAdded={fetchStaff} 
      />
    </div>
  );
}