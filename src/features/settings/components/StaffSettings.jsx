import React, { useState } from 'react';

export default function StaffSettings() {
  // Datos simulados (Luego los traeremos de una tabla 'empleados' en Supabase)
  const [staff, setStaff] = useState([
    { id: 1, nombre: 'Roberto Gym', rol: 'Monitor de Spinning', email: 'roberto@gymflow.com', estado: 'activo' },
    { id: 2, nombre: 'Lucía Zen', rol: 'Instructora de Yoga', email: 'lucia@gymflow.com', estado: 'activo' },
    { id: 3, nombre: 'Carlos Power', rol: 'Entrenador Personal', email: 'carlos@gymflow.com', estado: 'activo' },
    { id: 4, nombre: 'Marta Recepción', rol: 'Atención al Cliente', email: 'recepcion@gymflow.com', estado: 'inactivo' },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        
        {/* Cabecera de la sección */}
        <div className="mb-10 border-b border-slate-100 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Plantilla y Monitores</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Gestiona los accesos de tus empleados</p>
          </div>
          <button className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2">
            <span className="text-lg">+</span> Nuevo Empleado
          </button>
        </div>

        {/* Lista de Empleados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {staff.map((empleado) => (
            <div key={empleado.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col justify-between hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all group">
              
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {/* Avatar con la inicial */}
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
                
                {/* Botón de opciones (borrar/editar) */}
                <button className="text-slate-300 hover:text-slate-800 transition-colors px-2">
                  •••
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-500 truncate pr-4">{empleado.email}</p>
                
                {/* Badge de estado */}
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

      </div>
    </div>
  );
}