import React from 'react';
import SystemStatus from '../../features/dashboard/components/SystemStatus'; 

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

      <SystemStatus />
      
    </header>
  );
};

export default DashboardHeader;