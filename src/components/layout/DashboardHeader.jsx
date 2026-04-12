import React from 'react';
import CapacityCounter from './CapacityCounter';

const DashboardHeader = ({ title, user }) => {
  return (
    <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
          {title}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
            {user?.rol === 'admin' ? 'Sede Central • Gestión Pro' : 'Panel de Instructor'}
          </p>
        </div>
      </div>

      {/* Widget de Ocupación con diseño de alto impacto */}
      <CapacityCounter />
    </header>
  );
};

export default DashboardHeader;