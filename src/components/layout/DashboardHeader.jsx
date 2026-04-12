import React from 'react';
import CapacityCounter from './CapacityCounter';

const DashboardHeader = ({ title, user }) => {
  return (
    <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
          {title}
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></div>
          <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.25em]">
            {user?.rol === 'admin' ? 'Sede Central • Gestión Pro' : 'Panel de Instructor'}
          </p>
        </div>
      </div>

      <CapacityCounter />
    </header>
  );
};

export default DashboardHeader;