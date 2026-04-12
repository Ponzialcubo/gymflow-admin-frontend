import React from 'react';
import CapacityCounter from './CapacityCounter';

const DashboardHeader = ({ title, user }) => {
  return (
    // Reducimos el margen inferior a mb-6 para ganar espacio vertical
    <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        {/* Título un poco más pequeño (3xl) para evitar el scroll */}
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
          {title}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="h-1 w-1 rounded-full bg-blue-600"></span>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            {user?.rol === 'admin' ? 'Sede Central • Gestión Pro' : 'Panel de Instructor'}
          </p>
        </div>
      </div>

      {/* El contador ahora es la versión ultra-slim */}
      <CapacityCounter />
    </header>
  );
};

// --- LA LÍNEA QUE ARREGLA EL ERROR DE BUILD ---
export default DashboardHeader;