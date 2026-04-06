import React from 'react';
import SystemStatus from '../../features/dashboard/components/SystemStatus'; 
// Importación simplificada porque están en la misma carpeta
import CapacityCounter from './CapacityCounter';

const DashboardHeader = ({ title, user }) => {
  return (
    <header className="mb-10 flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
          {title}
        </h1>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
          {user?.rol === 'admin' ? 'Panel de Administración' : 'Panel de Instructor'}
        </p>
      </div>

      {/* Contenedor para los widgets de estado */}
      <div className="flex items-center gap-4">
        <CapacityCounter />
        <SystemStatus />
      </div>
      
    </header>
  );
};

export default DashboardHeader;